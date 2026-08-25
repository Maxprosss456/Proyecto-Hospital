const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient'); 
const app = express();

app.use(express.json());
app.use(cors());

console.log('Servidor conectado al módulo de Supabase con éxito.');

// ==========================================
// 1. RUTA DE AUTENTICACIÓN (LOGIN)
// ==========================================
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
// 2. RUTA DE CENTROS (HOSPITALES Y MÉDICOS)
// ==========================================
app.get('/api/centros', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('hospitales')
            .select(`
                id,
                nombre,
                telefono,
                email,
                codpostal,
                usuarios (
                    id,
                    nombre,
                    apellido,
                    dni,
                    antiguedad,
                    telefono,
                    email,
                    direccion,
                    posiciones ( posicion ),
                    titulo_usuario ( titulos ( titulo ) ),
                    sanciones:sanciones!fk_sancionado ( id, sancion )
                )
            `);

        if (error) return res.status(500).json({ error: error.message });

        const formateado = data.map((centro) => ({
            id: centro.id,
            nombre: centro.nombre,
            telefono: centro.telefono,
            email: centro.email,
            codigoPostal: centro.codpostal,
            medicos: (centro.usuarios || []).map((u) => ({
                id: u.id,
                nombre: `${u.nombre} ${u.apellido}`,
                dni: u.dni,
                antiguedad: u.antiguedad,
                telefono: u.telefono,
                email: u.email,
                direccion: u.direccion,
                cargo: u.posiciones?.posicion ?? 'Sin cargo asignado',
                titulos: (u.titulo_usuario || []).map((t) => t.titulos?.titulo).filter(Boolean),
                sanciones: u.sanciones || [],
            })),
        }));

        res.json(formateado);
    } catch (err) {
        console.error('Error crítico en Centros:', err);
        return res.status(500).json({ error: 'Error crítico en el servidor' });
    }
});

// ==========================================
// 3. RUTA DE INFORMES GENERALES
// ==========================================
app.get('/api/informes', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('informes')
            .select(`
                id,
                fecha,
                informe,
                hospitales:id_hospital ( nombre ),
                usuarios:id_remitente ( nombre, apellido )
            `)
            .order('fecha', { ascending: false });

        if (error) return res.status(500).json({ error: error.message });

        const formateado = data.map((row) => ({
            id: row.id,
            fecha: row.fecha,
            hospital: row.hospitales?.nombre ?? 'Desconocido',
            remitente: `${row.usuarios?.nombre ?? ''} ${row.usuarios?.apellido ?? ''}`.trim(),
            informe: row.informe,
        }));

        res.json(formateado);
    } catch (err) {
        console.error('Error crítico en Informes:', err);
        return res.status(500).json({ error: 'Error crítico en el servidor' });
    }
});
// ==========================================
// 4. RUTA DE SITUACIONES URGENTES
// ==========================================
app.get('/api/urgencias', async (req, res) => {
    try {
        const { data: urgencias, error } = await supabase
            .from('situaciones_urgentes')
            .select(`
                id,
                fecha,
                situación,
                hospitales:id_hospital ( nombre ),
                usuarios:id_remitente ( nombre, apellido )
            `)
            .order('fecha', { ascending: false });

        if (error) {
            console.error('Error al traer situaciones urgentes:', error);
            return res.status(500).json({ error: 'Error al consultar situaciones urgentes' });
        }

        const respuestaFormateada = urgencias.map((u) => ({
            Id: u.id,
            Titulo: `Urgencia #${u.id}`,
            Hospital_Nombre: u.hospitales?.nombre ?? 'Hospital no asignado',
            Ubicacion: 'Consulta externa',
            Informe: u.situación,
            Remitente: u.usuarios ? `${u.usuarios.nombre} ${u.usuarios.apellido}` : 'Desconocido'
        }));

        return res.json(respuestaFormateada);
    } catch (err) {
        console.error('Error crítico en Urgencias:', err);
        return res.status(500).json({ error: 'Error crítico en el servidor' });
    }
});

// Inicialización del servidor
app.listen(5000, () => {
    console.log('Servidor corriendo sin errores en http://localhost:5000');
});