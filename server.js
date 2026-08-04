const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient'); 
const app = express();
app.use(express.json());
app.use(cors());

console.log('Servidor conectado al módulo de Supabase con éxito.');

app.post('/api/login', async (req, res) => {
    const usuarioRecibido = req.body.usuario ? req.body.usuario.trim() : '';
    const claveRecibida = req.body.clave ? req.body.clave.trim() : ''; 

    console.log('--- NUEVO INTENTO DE LOGIN ---');
    console.log('Recibido del Frontend:', { usuario: usuarioRecibido, clave: claveRecibida });

    try {
        const { data: todosLosUsuarios, error: errorPrueba } = await supabase
            .from('usuarios')
            .select('*');

        console.log('DETECTADO EN LA TABLA USUARIOS DE SUPABASE:', todosLosUsuarios);

        if (errorPrueba) {
            console.error('Error directo de Supabase:', errorPrueba);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        if (!todosLosUsuarios || todosLosUsuarios.length === 0) {
            console.log('⚠️ Supabase devolvió una lista vacía []. Revisa las políticas RLS en la web.');
            return res.status(401).json({ error: 'Usuario o clave incorrectos' });
        }

        const u = todosLosUsuarios.find(user => 
            user.usuario && user.usuario.trim().toLowerCase() === usuarioRecibido.toLowerCase()
        );

        if (!u) {
            console.log('⚠️ El usuario no coincide con lo que hay en el array.');
            return res.status(401).json({ error: 'Usuario o clave incorrectos' });
        }

        const claveBD = u.clave ? u.clave.trim() : '';
        if (claveBD !== claveRecibida) {
            console.log('⚠️ Contraseña incorrecta.');
            return res.status(401).json({ error: 'Usuario o clave incorrectos' });
        }

        // Si pasa los filtros, responde con éxito
        return res.json({
            id: u.id,
            usuario: u.usuario.trim(),
            nombre: u.nombre ? `${u.nombre.trim()} ${u.apellido ? u.apellido.trim() : ''}` : 'Usuario', 
            rango: 'Admin', 
            hospital: 'Hospital General',
            logo: '/hospital_logo.ico'
        });

    } catch (err) {
        console.error('💥 Error crítico:', err);
        return res.status(500).json({ error: 'Error crítico en el servidor' });
    }
});
// ==========================================
// 2. RUTA DE SITUACIONES URGENTES (INFORMES)
// ==========================================
app.get('/api/urgencias', async (req, res) => {
    try {
        const { data: informes, error } = await supabase
            .from('informes')
            .select(`
                id,
                fecha,
                id_hospital,
                informe,
                usuarios ( nombre, apellido )
            `)
            .order('fecha', { ascending: false });

        if (error) {
            console.error('Error al traer informes:', error);
            return res.status(500).json({ error: 'Error al consultar informes' });
        }

        return res.json(informes);
    } catch (err) {
        console.error('Error crítico en Informes:', err);
        return res.status(500).json({ error: 'Error crítico en el servidor' });
    }
});

// Iniciar servidor en el puerto 5000
app.listen(5000, () => {
    console.log('Servidor corriendo sin errores en http://localhost:5000');
});