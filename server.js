import express from 'express';
import cors from 'cors';

const app = express();
// ✅ USA EL PUERTO DE RENDER, NO 5000
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: '🚀 API RETAFOR funcionando en Render!',
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de API
app.get('/api', (req, res) => {
  res.json({ 
    success: true,
    message: 'API RETAFOR - Sistema de gestión ambiental',
    endpoints: {
      sincronizacion: 'POST /api/sync/datos',
      catalogos: 'GET /api/sync/catalogos'
    }
  });
});

// Ruta de sincronización
app.post('/api/sync/datos', (req, res) => {
  console.log('📤 Datos recibidos:', req.body);
  res.json({ 
    success: true, 
    message: 'Datos recibidos en el servidor',
    datos_recibidos: req.body
  });
});

// Ruta de catálogos
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

// ✅ ESCUCHAR EN 0.0.0.0 (IMPORTANTE PARA RENDER)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Servidor RETAFOR ejecutándose en puerto ${PORT}`);
});