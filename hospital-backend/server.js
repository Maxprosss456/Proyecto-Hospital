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
// 2. RUTA DE CENTROS Y HOSPITALES (CORREGIDA)
// ==========================================
const obtenerHospitales = async (req, res) => {
    try {
        console.log('--- CONSULTANDO HOSPITALES EN SUPABASE ---');

        // 1. Traemos la lista principal de hospitales directamente
        const { data: listaHospitales, error: errHospitales } = await supabase
            .from('hospitales')
            .select('*');

        if (errHospitales) {
            console.error('Error al traer la tabla hospitales:', errHospitales);
            return res.status(500).json({ error: errHospitales.message });
        }

        console.log('Hospitales encontrados directamente:', listaHospitales);

        if (!listaHospitales || listaHospitales.length === 0) {
            return res.json([]);
        }

        // 2. Intentamos traer los usuarios con sus datos (si las relaciones existen)
        let usuariosPorHospital = {};
        try {
            const { data: usuariosData } = await supabase
                .from('usuarios')
                .select(`
                    id, id_hospital, nombre, apellido, dni, antiguedad, telefono, email, direccion,
                    posiciones ( posicion ),
                    sanciones ( id, sancion )
                `);

            if (usuariosData) {
                usuariosData.forEach((u) => {
                    const hospId = u.id_hospital;
                    if (!usuariosPorHospital[hospId]) usuariosPorHospital[hospId] = [];
                    usuariosPorHospital[hospId].push(u);
                });
            }
        } catch (errRel) {
            console.warn('Aviso: No se pudieron traer las relaciones de médicos, se enviarán centros vacíos de personal.', errRel);
        }

        // 3. Formateamos la respuesta integrando ambos datos
        const formateado = listaHospitales.map((centro) => {
            const medicosDelCentro = usuariosPorHospital[centro.id] || [];
            
            return {
                id: centro.id,
                nombre: centro.nombre,
                telefono: centro.telefono,
                email: centro.email,
                codigoPostal: centro.codpostal,
                medicos: medicosDelCentro.map((u) => ({
                    id: u.id,
                    nombre: `${u.nombre || ''} ${u.apellido || ''}`.trim(),
                    dni: u.dni,
                    antiguedad: u.antiguedad,
                    telefono: u.telefono,
                    email: u.email,
                    direccion: u.direccion,
                    cargo: u.posiciones?.posicion ?? 'Sin cargo asignado',
                    sanciones: u.sanciones || [],
                })),
            };
        });

        res.json(formateado);
    } catch (err) {
        console.error('Error crítico en Centros/Hospitales:', err);
        return res.status(500).json({ error: 'Error crítico en el servidor' });
    }
};

app.get('/api/centros', obtenerHospitales);
app.get('/api/hospitales', obtenerHospitales);

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

        const formateado = (data || []).map((row) => ({
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

        const respuestaFormateada = (urgencias || []).map((u) => ({
            Id: u.id,
            Titulo: `Urgencia #${u.id}`,
            Hospital_Nombre: u.hospitales?.nombre ?? 'Hospital no asignado',
            Ubicacion: 'Consulta externa',
            Informe: u.situación,
            Remitente: u.usuarios ? `${u.usuarios.nombre || ''} ${u.usuarios.apellido || ''}`.trim() : 'Desconocido'
        }));

        return res.json(respuestaFormateada);
    } catch (err) {
        console.error('Error crítico en Urgencias:', err);
        return res.status(500).json({ error: 'Error crítico en el servidor' });
    }
});

// ==========================================
// CREAR NUEVO INFORME (POST)
// ==========================================
app.post('/api/informes', async (req, res) => {
    try {
        const { id_hospital, id_remitente, informe } = req.body;

        if (!informe || !informe.trim()) {
            return res.status(400).json({ error: 'El contenido del informe es obligatorio.' });
        }

        const { data, error } = await supabase
            .from('informes')
            .insert([
                {
                    fecha: new Date().toISOString(),
                    informe: informe.trim(),
                    id_hospital: id_hospital ? Number(id_hospital) : null,
                    id_remitente: id_remitente ? Number(id_remitente) : null
                }
            ])
            .select();

        if (error) {
            console.error('Error insertando informe:', error);
            return res.status(500).json({ error: error.message });
        }

        return res.status(201).json({ mensaje: 'Informe creado con éxito', data: data[0] });
    } catch (err) {
        console.error('Error crítico al crear informe:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// ==========================================
// CREAR NUEVA URGENCIA (POST)
// ==========================================
app.post('/api/urgencias', async (req, res) => {
    try {
        const { id_hospital, id_remitente, situacion } = req.body;

        if (!situacion || !situacion.trim()) {
            return res.status(400).json({ error: 'La descripción de la situación es obligatoria.' });
        }

        const { data, error } = await supabase
            .from('situaciones_urgentes')
            .insert([
                {
                    fecha: new Date().toISOString(),
                    situación: situacion.trim(), // Nombre exacto de la columna en Supabase
                    id_hospital: id_hospital ? Number(id_hospital) : null,
                    id_remitente: id_remitente ? Number(id_remitente) : null
                }
            ])
            .select();

        if (error) {
            console.error('Error insertando urgencia:', error);
            return res.status(500).json({ error: error.message });
        }

        return res.status(201).json({ mensaje: 'Urgencia registrada con éxito', data: data[0] });
    } catch (err) {
        console.error('Error crítico al crear urgencia:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Inicialización del servidor
app.listen(5000, () => {
    console.log('Servidor corriendo sin errores en http://localhost:5000');
});