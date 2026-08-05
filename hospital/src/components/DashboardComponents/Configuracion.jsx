import React from 'react';

const Configuracion = () => {
  const estilosLocales = {
    contenedorNormas: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '20px',
      height: '100%',
      boxSizing: 'border-box',
      overflowY: 'auto' 
    },
    tituloPrincipal: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: '5px',
      fontFamily: 'sans-serif',
    },
    subtituloSeccion: {
      fontSize: '20px',
      fontWeight: '500',
      color: '#111111',
      marginBottom: '10px',
      fontFamily: 'sans-serif'
    },
    cajaTextoScroll: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #CCCCCC',
      borderRadius: '8px',
      padding: '15px',
      boxSizing: 'border-box',
      color: '#333333',
      fontFamily: 'monospace',
      fontSize: '13px',
      textAlign: 'justify',
      height: '150px',
      overflowY: 'scroll'
    }
  };

  return (
    <div style={estilosLocales.contenedorNormas}>
      
      <h1 style={estilosLocales.tituloPrincipal}>Normas y cumplimiento legal</h1>

      {/* BLOQUE 1: Reglamento General de Salud y Seguridad */}
      <div>
        <h2 style={estilosLocales.subtituloSeccion}>Reglamento General de Salud y Seguridad</h2>
        <div style={estilosLocales.cajaTextoScroll}>
          <strong>Art. a: Protocolo de Lavado de Manos y Sanitización.</strong> Todo el personal médico, de enfermería y técnico que ingrese a las áreas críticas (UCI, Quirófanos, Neonatología) debe realizar el lavado clínico de manos según los 5 momentos estipulados por la OMS, utilizando soluciones antisépticas autorizadas. El incumplimiento de esta norma será considerado una falta grave contra la seguridad del paciente.
          <br /><br />
          <strong>Art. b: Uso de Elementos de Protección Personal (EPP).</strong> Es de carácter obligatorio el uso de mascarillas quirúrgicas de alta eficiencia, guantes estériles y batas descartables durante cualquier procedimiento invasivo. Los elementos de protección deben ser desechados inmediatamente en los contenedores de riesgo biológico correspondientes al finalizar la intervención.
          <br /><br />
          <strong>Art. c: Gestión de Residuos Patogénicos.</strong> Las agujas, bisturís y cualquier material punzocortante deberán descartarse únicamente en los recipientes rígidos de color rojo. Queda estrictamente prohibido desechar materiales biológicos en bolsas de residuos comunes.
        </div>
      </div>

      {/* BLOQUE 2: Protocolo de Confidencialidad y Protección de Datos */}
      <div>
        <h2 style={estilosLocales.subtituloSeccion}>Protocolo de Confidencialidad y Proteccion de Datos</h2>
        <div style={estilosLocales.cajaTextoScroll}>
          <strong>Art. a: Secreto Profesional y Ley de Derechos del Paciente.</strong> Toda la información clínica, diagnósticos, tratamientos e historial médico de los pacientes ingresados en esta institución médica tiene carácter de confidencialidad absoluta. Ningún miembro del personal está autorizado a divulgar datos a terceros sin el consentimiento expreso y firmado del paciente o su tutor legal.
          <br /><br />
          <strong>Art. b: Seguridad de Acceso Informático al Sistema.</strong> Las credenciales de acceso al software hospitalario (como el usuario y contraseña de este panel) son estrictamente personales e intransferibles. Queda prohibido dejar terminales de computadoras abiertas o desatendidas en los pasillos o estaciones de enfermería.
          <br /><br />
          <strong>Art. c: Filmaciones y Fotografías en Áreas Médicas.</strong> Queda terminantemente prohibido tomar capturas de pantalla, fotografías o filmaciones dentro de las salas de internación o áreas quirúrgicas que expongan la identidad de los pacientes o el uso de los equipos sin previa autorización de la Dirección Médica.
        </div>
      </div>

    </div>
  );
};

export default Configuracion;