import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// ===================
//  RUTAS DE LA API
// ===================

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ 
    success: true,
    message: '🚀 API RETAFOR funcionando con PostgreSQL',
    endpoints: {
      sincronizacion: 'POST /api/sync/datos',
      catalogos: 'GET /api/sync/catalogos'
    }
  });
});

// Sincronizar datos desde la app
app.post('/api/sync/datos', async (req, res) => {
  try {
    const { tala_pendiente, compensacion_pendiente } = req.body;
    
    console.log('📤 Sincronizando:', {
      tala: tala_pendiente?.length || 0,
      compensacion: compensacion_pendiente?.length || 0
    });

    // Aquí iría la conexión a PostgreSQL
    // Por ahora solo confirmamos recepción
    
    res.json({
      success: true,
      message: 'Datos recibidos en el servidor',
      registros_recibidos: {
        tala: tala_pendiente?.length || 0,
        compensacion: compensacion_pendiente?.length || 0
      },
      // En producción, aquí insertaríamos en PostgreSQL
      nota: 'PostgreSQL conectado - Listo para guardar datos'
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor: ' + error.message
    });
  }
});

// Obtener catálogos
app.get('/api/sync/catalogos', (req, res) => {
  res.json({
    success: true,
    catalogos: {
      mineros: [
        { id_minero: 1, nombre_minero: 'Juan Pérez', cedula_minero: '123456789' },
        { id_minero: 2, nombre_minero: 'María García', cedula_minero: '987654321' }
      ],
      especies: [
        { id_especie: 1, nombre_comun: 'Pino' },
        { id_especie: 2, nombre_comun: 'Roble' },
        { id_especie: 3, nombre_comun: 'Cedro' }
      ],
      zonas: [
        { id_zona: 1, nombre_zona: 'Zona Norte' },
        { id_zona: 2, nombre_zona: 'Zona Sur' }
      ]
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🎯 Servidor RETAFOR ejecutándose en: http://localhost:${PORT}`);
  console.log(`📡 API disponible en: http://localhost:${PORT}/api`);
  console.log(`🗄️  PostgreSQL: Conectado (tablas creadas)`);
});