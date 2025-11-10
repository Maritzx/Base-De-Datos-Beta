export const cultivationEntities = [
  {
    id: 'growRooms',
    label: 'Salas de cultivo',
    description:
      'Inventario de salas disponibles (flora, vegetación y carpa de madres) con sus dimensiones, finalidad y objetivos ambientales.',
    lifecycleStage: 'Infraestructura',
    fields: [
      { name: 'roomCode', label: 'Código de sala', type: 'text', required: true },
      { name: 'roomName', label: 'Nombre', type: 'text', required: true },
      { name: 'dimensions', label: 'Dimensiones (m)', type: 'text', placeholder: 'Ej. 3 x 3' },
      { name: 'areaM2', label: 'Superficie (m²)', type: 'number', step: 0.1 },
      {
        name: 'intendedStage',
        label: 'Etapa principal',
        type: 'select',
        options: ['Vegetación', 'Floración', 'Propagación', 'Madres']
      },
      {
        name: 'lighting',
        label: 'Iluminación instalada',
        type: 'multiSelect',
        options: ['LED', 'CMH', 'HPS', 'Fluorescente']
      },
      {
        name: 'environmentalTargets',
        label: 'Objetivos ambientales',
        type: 'textarea',
        placeholder: 'Rangos de temperatura, HR, PPFD, VPD'
      },
      { name: 'notes', label: 'Observaciones', type: 'textarea' }
    ],
    keyRelations: ['hydroponicSystems', 'environmentReadings', 'cultivationBatches']
  },
  {
    id: 'hydroponicSystems',
    label: 'Sistemas hidropónicos',
    description:
      'Detalle de cada sistema 8x1 y bandejas disponibles, incluyendo capacidades de plantas, depósitos y sensores.',
    lifecycleStage: 'Infraestructura',
    fields: [
      { name: 'systemCode', label: 'Código de sistema', type: 'text', required: true },
      { name: 'systemName', label: 'Nombre del sistema', type: 'text', required: true },
      {
        name: 'roomId',
        label: 'Sala asociada',
        type: 'select',
        optionsReference: 'growRooms',
        required: true
      },
      {
        name: 'systemType',
        label: 'Tipo de sistema',
        type: 'select',
        options: ['RDWC', 'DWC', 'NFT', 'Aeropónico', 'Bandeja propagación']
      },
      { name: 'bucketCount', label: 'Baldes / slots', type: 'number', min: 0 },
      { name: 'plantCapacity', label: 'Capacidad máxima (plantas)', type: 'number', min: 0 },
      { name: 'reservoirVolume', label: 'Volumen del depósito (L)', type: 'number', step: 0.1 },
      { name: 'bucketVolume', label: 'Volumen por balde (L)', type: 'number', step: 0.1 },
      {
        name: 'sensors',
        label: 'Sensores instalados',
        type: 'multiSelect',
        options: ['ORP', 'EC', 'pH', 'Temperatura agua', 'Nivel', 'Flujo']
      },
      { name: 'notes', label: 'Observaciones', type: 'textarea' }
    ],
    keyRelations: ['cultivationBatches', 'environmentReadings', 'harvestRecords']
  },
  {
    id: 'geneticCatalog',
    label: 'Catálogo genético',
    description:
      'Registro de genéticas disponibles con su banco, quimiotipo, registro INASE y tiempos de floración.',
    lifecycleStage: 'Planificación genética',
    fields: [
      { name: 'geneticCode', label: 'ID de genética', type: 'text', required: true },
      { name: 'strainName', label: 'Nombre comercial', type: 'text', required: true },
      { name: 'breeder', label: 'Banco o criador', type: 'text' },
      {
        name: 'dominantProfile',
        label: 'Perfil predominante',
        type: 'select',
        options: ['THC dominante', 'CBD dominante', 'Balanceado', 'CBG', 'Otro']
      },
      {
        name: 'thcPresence',
        label: 'Contiene THC',
        type: 'select',
        options: ['Sí', 'No']
      },
      {
        name: 'cbdPresence',
        label: 'Contiene CBD',
        type: 'select',
        options: ['Sí', 'No']
      },
      {
        name: 'inaseRegistered',
        label: 'Inscripta en INASE',
        type: 'select',
        options: ['Sí', 'No', 'En trámite']
      },
      {
        name: 'floweringWeeks',
        label: 'Semanas de floración según banco',
        type: 'number',
        step: 0.1
      },
      { name: 'notes', label: 'Observaciones', type: 'textarea' }
    ],
    keyRelations: ['cultivationBatches', 'harvestRecords', 'cycleComparisons']
  },
  {
    id: 'cultivationBatches',
    label: 'Lotes de cultivo',
    description:
      'Seguimiento por lote y genética, vinculando salas y sistemas activos para cada ciclo.',
    lifecycleStage: 'Ciclo activo',
    fields: [
      { name: 'batchCode', label: 'ID de lote', type: 'text', required: true },
      {
        name: 'geneticId',
        label: 'Genética utilizada',
        type: 'select',
        optionsReference: 'geneticCatalog',
        required: true
      },
      { name: 'startDate', label: 'Inicio del ciclo', type: 'date', required: true },
      {
        name: 'stage',
        label: 'Estado actual',
        type: 'select',
        options: ['Propagación', 'Vegetación', 'Floración', 'Madres']
      },
      { name: 'roomId', label: 'Sala asignada', type: 'select', optionsReference: 'growRooms' },
      {
        name: 'systemId',
        label: 'Sistema hidropónico',
        type: 'select',
        optionsReference: 'hydroponicSystems'
      },
      { name: 'plantCount', label: 'Plantas en el lote', type: 'number', min: 0 },
      {
        name: 'targetFloweringWeeks',
        label: 'Semanas de floración planificadas',
        type: 'number',
        step: 0.1
      },
      { name: 'notes', label: 'Observaciones', type: 'textarea' }
    ],
    keyRelations: ['environmentReadings', 'harvestRecords', 'cycleComparisons']
  },
  {
    id: 'environmentReadings',
    label: 'Lecturas ambientales y de solución',
    description:
      'Monitoreo de ORP, EC, pH, humedad, PPFD y temperaturas en cada sala o sistema.',
    lifecycleStage: 'Monitoreo diario',
    fields: [
      { name: 'timestamp', label: 'Fecha y hora', type: 'datetime-local', required: true },
      { name: 'roomId', label: 'Sala', type: 'select', optionsReference: 'growRooms' },
      { name: 'systemId', label: 'Sistema', type: 'select', optionsReference: 'hydroponicSystems' },
      { name: 'batchId', label: 'Lote asociado', type: 'select', optionsReference: 'cultivationBatches' },
      { name: 'orp', label: 'ORP (mV)', type: 'number', step: 0.1 },
      { name: 'ec', label: 'EC (mS/cm)', type: 'number', step: 0.01 },
      { name: 'ph', label: 'pH', type: 'number', step: 0.01 },
      { name: 'humidity', label: 'Humedad relativa (%)', type: 'number', step: 0.1 },
      { name: 'ppfd', label: 'PPFD (µmol/m²/s)', type: 'number', step: 1 },
      {
        name: 'ambientTemperature',
        label: 'Temperatura ambiente (°C)',
        type: 'number',
        step: 0.1
      },
      {
        name: 'waterTemperature',
        label: 'Temperatura del agua (°C)',
        type: 'number',
        step: 0.1
      },
      { name: 'notes', label: 'Observaciones', type: 'textarea' }
    ],
    keyRelations: ['cultivationBatches', 'cycleComparisons']
  },
  {
    id: 'harvestRecords',
    label: 'Cosechas y rendimiento en seco',
    description:
      'Registro del peso seco por genética y por sistema para comparar ciclos de floración.',
    lifecycleStage: 'Cosecha',
    fields: [
      { name: 'harvestCode', label: 'Código de cosecha', type: 'text', required: true },
      { name: 'harvestDate', label: 'Fecha de cosecha', type: 'date', required: true },
      { name: 'batchId', label: 'Lote', type: 'select', optionsReference: 'cultivationBatches' },
      { name: 'geneticId', label: 'Genética', type: 'select', optionsReference: 'geneticCatalog' },
      { name: 'systemId', label: 'Sistema', type: 'select', optionsReference: 'hydroponicSystems' },
      { name: 'floweringWeeks', label: 'Semanas de floración realizadas', type: 'number', step: 0.1 },
      { name: 'dryWeight', label: 'Peso seco (g)', type: 'number', step: 1 },
      { name: 'trimNotes', label: 'Notas de manicura / destino', type: 'textarea' }
    ],
    keyRelations: ['cycleComparisons']
  },
  {
    id: 'cycleComparisons',
    label: 'Comparativos entre cultivos',
    description:
      'Resumen de métricas clave por genética y sistema para evaluar mejoras a lo largo del tiempo.',
    lifecycleStage: 'Análisis',
    fields: [
      { name: 'comparisonId', label: 'Identificador', type: 'text', required: true },
      { name: 'period', label: 'Periodo evaluado', type: 'text', placeholder: 'Ej. Floración Q1 2025' },
      { name: 'geneticId', label: 'Genética', type: 'select', optionsReference: 'geneticCatalog' },
      { name: 'systemId', label: 'Sistema', type: 'select', optionsReference: 'hydroponicSystems' },
      {
        name: 'batchSummary',
        label: 'Lotes incluidos',
        type: 'textarea',
        placeholder: 'Listar códigos de lote comparados'
      },
      { name: 'avgDryYield', label: 'Promedio peso seco (g)', type: 'number', step: 0.1 },
      { name: 'avgPPFD', label: 'PPFD promedio (µmol/m²/s)', type: 'number', step: 1 },
      { name: 'avgEC', label: 'EC promedio (mS/cm)', type: 'number', step: 0.01 },
      { name: 'observations', label: 'Conclusiones / acciones', type: 'textarea' }
    ],
    keyRelations: ['harvestRecords', 'environmentReadings']
  }
];

export const entityMap = cultivationEntities.reduce((acc, entity) => {
  acc[entity.id] = entity;
  return acc;
}, {});

export const databaseMetadata = {
  version: '1.1.0',
  author: 'Equipo Cultivo Indoor',
  description:
    'Modelo de datos adaptado a un cultivo indoor con sala de flora 3x3 (dos sistemas 8x1), sala de vegetación y carpa de madres con esquejera hidroponica.',
  lifecycleCoverage: ['Propagación', 'Vegetación', 'Floración', 'Post-cosecha', 'Análisis y mejora continua'],
  kpis: [
    'Gramos secos por sistema',
    'Gramos secos por planta y genética',
    'Semanas reales de floración vs planificadas',
    'Promedios de EC y pH por ciclo',
    'PPFD promedio por sala',
    'Rendimiento acumulado por trimestre'
  ]
};
