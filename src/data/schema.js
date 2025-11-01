export const cultivationEntities = [
  {
    id: 'genetics',
    label: 'Genética y Material Inicial',
    description:
      'Registro integral de semillas, esquejes y material de partida utilizado en cada ciclo productivo. Incluye trazabilidad, certificaciones y condiciones de almacenamiento.',
    lifecycleStage: 'Pre-producción',
    fields: [
      { name: 'identifier', label: 'Código Interno', type: 'text', required: true },
      {
        name: 'sourceType',
        label: 'Tipo de material',
        type: 'select',
        options: ['Semilla', 'Esqueje', 'Cultivo in vitro'],
        required: true
      },
      { name: 'geneticName', label: 'Nombre comercial o cultivar', type: 'text', required: true },
      {
        name: 'breeder',
        label: 'Banco / Criador',
        type: 'text',
        placeholder: 'Ej. Sensi Seeds, Ripper Seeds'
      },
      {
        name: 'chemotype',
        label: 'Quimiotipo objetivo',
        type: 'multiSelect',
        options: ['I (THC alto)', 'II (Balanceado)', 'III (CBD alto)', 'IV (CBG alto)', 'V (fibra)'],
        required: true
      },
      {
        name: 'certifications',
        label: 'Certificaciones / Licencias',
        type: 'textarea',
        placeholder: 'Nº de licencia, certificación fitosanitaria, etc.'
      },
      {
        name: 'storageConditions',
        label: 'Condiciones de almacenamiento',
        type: 'textarea',
        placeholder: 'Temperatura, HR, control de plagas, fecha de ingreso'
      },
      {
        name: 'germinationRate',
        label: 'Porcentaje de germinación o enraizamiento esperado',
        type: 'number',
        unit: '%',
        min: 0,
        max: 100
      },
      {
        name: 'notes',
        label: 'Observaciones relevantes',
        type: 'textarea'
      }
    ],
    keyRelations: ['batches', 'propagationRooms']
  },
  {
    id: 'propagationRooms',
    label: 'Instalaciones de Propagación',
    description:
      'Espacios destinados a germinación y enraizamiento. Permiten gestionar la infraestructura disponible, condiciones ambientales y bioseguridad.',
    lifecycleStage: 'Germinación / Propagación',
    fields: [
      { name: 'roomCode', label: 'Código de sala', type: 'text', required: true },
      { name: 'capacity', label: 'Capacidad máxima (plantas)', type: 'number', min: 0 },
      {
        name: 'lightingType',
        label: 'Sistema de iluminación',
        type: 'multiSelect',
        options: ['LED', 'CMH', 'HPS', 'Fluorescente', 'Natural']
      },
      {
        name: 'hvac',
        label: 'HVAC y tratamiento de aire',
        type: 'textarea',
        placeholder: 'Filtración HEPA, renovación de aire, presión positiva, etc.'
      },
      {
        name: 'sanitationProtocol',
        label: 'Protocolos de bioseguridad',
        type: 'textarea'
      },
      {
        name: 'monitoringSystems',
        label: 'Sistemas de monitoreo',
        type: 'multiSelect',
        options: ['Sensores ambientales', 'Cámaras', 'IoT', 'Manual']
      },
      {
        name: 'notes',
        label: 'Observaciones',
        type: 'textarea'
      }
    ],
    keyRelations: ['environmentReadings']
  },
  {
    id: 'batches',
    label: 'Lotes de Cultivo',
    description:
      'Estructura principal para planificar y seguir lotes de cultivo desde la propagación hasta la cosecha. Incluye asignación de recursos, escalas y objetivos productivos.',
    lifecycleStage: 'Todo el ciclo',
    fields: [
      { name: 'batchCode', label: 'Código de lote', type: 'text', required: true },
      {
        name: 'startDate',
        label: 'Fecha de inicio',
        type: 'date',
        required: true
      },
      {
        name: 'originMaterial',
        label: 'Material de origen',
        type: 'select',
        optionsReference: 'genetics',
        placeholder: 'Seleccionar genética registrada'
      },
      {
        name: 'propagationRoom',
        label: 'Sala de propagación',
        type: 'select',
        optionsReference: 'propagationRooms'
      },
      {
        name: 'productionScale',
        label: 'Escala de cultivo',
        type: 'select',
        options: ['Micro', 'Pequeña', 'Mediana', 'Industrial']
      },
      {
        name: 'cultivationSystem',
        label: 'Sistema de cultivo',
        type: 'multiSelect',
        options: ['Interior', 'Invernadero', 'Exterior', 'Aeropónico', 'Hidropónico', 'Coco', 'Sustrato orgánico']
      },
      {
        name: 'targetYield',
        label: 'Rendimiento objetivo (g/planta)',
        type: 'number',
        min: 0
      },
      {
        name: 'targetCannabinoids',
        label: 'Objetivos cannabinoides',
        type: 'textarea',
        placeholder: 'THC %, CBD %, terpenos, etc.'
      },
      {
        name: 'complianceRequirements',
        label: 'Requisitos regulatorios',
        type: 'textarea',
        placeholder: 'GACP, GMP, trazabilidad, auditorías'
      },
      {
        name: 'notes',
        label: 'Observaciones',
        type: 'textarea'
      }
    ],
    keyRelations: ['plantRecords', 'environmentReadings', 'taskCalendar', 'harvests']
  },
  {
    id: 'plantRecords',
    label: 'Registro Individual de Plantas',
    description:
      'Seguimiento detallado de plantas representativas o muestreadas. Permite comparar fenotipos, estados sanitarios y evolución fenológica.',
    lifecycleStage: 'Todo el ciclo',
    fields: [
      {
        name: 'plantTag',
        label: 'Etiqueta / Código de planta',
        type: 'text',
        required: true
      },
      {
        name: 'batchCode',
        label: 'Lote asociado',
        type: 'select',
        optionsReference: 'batches',
        required: true
      },
      {
        name: 'propagationType',
        label: 'Origen',
        type: 'select',
        options: ['Semilla', 'Esqueje'],
        required: true
      },
      {
        name: 'phenotypeNotes',
        label: 'Características fenotípicas',
        type: 'textarea'
      },
      {
        name: 'stage',
        label: 'Estado fenológico actual',
        type: 'select',
        options: ['Plántula', 'Vegetativo', 'Prefloración', 'Floración', 'Maduración']
      },
      {
        name: 'healthStatus',
        label: 'Estado sanitario',
        type: 'select',
        options: ['Óptimo', 'Alerta', 'Crítico'],
        required: true
      },
      {
        name: 'biomass',
        label: 'Biomasa fresca estimada (g)',
        type: 'number',
        min: 0
      },
      {
        name: 'height',
        label: 'Altura (cm)',
        type: 'number',
        min: 0
      },
      {
        name: 'canopyDiameter',
        label: 'Diámetro de copa (cm)',
        type: 'number',
        min: 0
      },
      {
        name: 'notes',
        label: 'Observaciones',
        type: 'textarea'
      }
    ],
    keyRelations: ['growthObservations', 'pestIncidents']
  },
  {
    id: 'taskCalendar',
    label: 'Planificación y Bitácora de Tareas',
    description:
      'Agenda operativa para programar y registrar actividades críticas: riegos, podas, aplicaciones fitosanitarias, auditorías y controles de calidad.',
    lifecycleStage: 'Todo el ciclo',
    fields: [
      { name: 'taskName', label: 'Actividad', type: 'text', required: true },
      {
        name: 'batchCode',
        label: 'Lote / Sala involucrada',
        type: 'select',
        optionsReference: 'batches'
      },
      {
        name: 'responsible',
        label: 'Responsable / Equipo',
        type: 'text',
        required: true
      },
      {
        name: 'scheduledDate',
        label: 'Fecha programada',
        type: 'datetime-local',
        required: true
      },
      {
        name: 'completedDate',
        label: 'Fecha de ejecución',
        type: 'datetime-local'
      },
      {
        name: 'taskCategory',
        label: 'Categoría',
        type: 'multiSelect',
        options: ['Riego', 'Nutrición', 'Poda', 'Capacitación', 'Control sanitario', 'Auditoría', 'Mantenimiento']
      },
      {
        name: 'resourcesUsed',
        label: 'Recursos utilizados',
        type: 'textarea',
        placeholder: 'Horas hombre, insumos, maquinaria'
      },
      {
        name: 'status',
        label: 'Estado',
        type: 'select',
        options: ['Programada', 'En progreso', 'Completada', 'Reprogramada']
      },
      {
        name: 'verification',
        label: 'Verificación / QA',
        type: 'textarea'
      }
    ],
    keyRelations: ['nutrientPlans', 'irrigationEvents']
  },
  {
    id: 'environmentReadings',
    label: 'Lecturas Ambientales',
    description:
      'Registros manuales o automáticos de condiciones ambientales críticas para cada sala o lote.',
    lifecycleStage: 'Todo el ciclo',
    fields: [
      {
        name: 'timestamp',
        label: 'Fecha y hora',
        type: 'datetime-local',
        required: true
      },
      {
        name: 'location',
        label: 'Ubicación / Sala',
        type: 'select',
        optionsReference: 'propagationRooms',
        placeholder: 'Sala o invernadero'
      },
      {
        name: 'batchCode',
        label: 'Lote asociado',
        type: 'select',
        optionsReference: 'batches'
      },
      { name: 'temperature', label: 'Temperatura (°C)', type: 'number', step: 0.1 },
      { name: 'humidity', label: 'Humedad relativa (%)', type: 'number', step: 0.1 },
      { name: 'vpd', label: 'Déficit de presión de vapor (kPa)', type: 'number', step: 0.01 },
      { name: 'co2', label: 'CO₂ (ppm)', type: 'number' },
      { name: 'ppfd', label: 'PPFD (µmol/m²/s)', type: 'number' },
      {
        name: 'photoperiod',
        label: 'Fotoperiodo (horas)',
        type: 'number',
        step: 0.1
      },
      {
        name: 'notes',
        label: 'Notas / Alarmas',
        type: 'textarea'
      }
    ],
    keyRelations: ['taskCalendar']
  },
  {
    id: 'irrigationEvents',
    label: 'Riegos y Drenajes',
    description:
      'Detalle de eventos de riego, drenaje y fertirriego, con control de soluciones nutritivas y parámetros de sustrato.',
    lifecycleStage: 'Vegetativo / Floración',
    fields: [
      {
        name: 'batchCode',
        label: 'Lote',
        type: 'select',
        optionsReference: 'batches',
        required: true
      },
      {
        name: 'eventDate',
        label: 'Fecha y hora',
        type: 'datetime-local',
        required: true
      },
      {
        name: 'volumeIn',
        label: 'Volumen aplicado (L)',
        type: 'number',
        min: 0,
        step: 0.1
      },
      {
        name: 'ecIn',
        label: 'EC solución entrada (mS/cm)',
        type: 'number',
        step: 0.01
      },
      {
        name: 'phIn',
        label: 'pH solución entrada',
        type: 'number',
        step: 0.01
      },
      {
        name: 'runoffPercent',
        label: '% Drenaje',
        type: 'number',
        step: 0.1
      },
      {
        name: 'ecOut',
        label: 'EC drenaje (mS/cm)',
        type: 'number',
        step: 0.01
      },
      {
        name: 'phOut',
        label: 'pH drenaje',
        type: 'number',
        step: 0.01
      },
      {
        name: 'additives',
        label: 'Aditivos / Fertilizantes',
        type: 'textarea'
      },
      {
        name: 'notes',
        label: 'Observaciones',
        type: 'textarea'
      }
    ],
    keyRelations: ['nutrientPlans', 'substrateMetrics']
  },
  {
    id: 'nutrientPlans',
    label: 'Plan Nutricional y Soluciones',
    description:
      'Diseño y seguimiento de recetas nutricionales, curvas de fertilización y correcciones aplicadas por etapa fenológica.',
    lifecycleStage: 'Vegetativo / Floración',
    fields: [
      {
        name: 'planName',
        label: 'Nombre del plan',
        type: 'text',
        required: true
      },
      {
        name: 'batchCode',
        label: 'Lote / Grupo objetivo',
        type: 'select',
        optionsReference: 'batches'
      },
      {
        name: 'stage',
        label: 'Etapa fenológica',
        type: 'select',
        options: ['Plántula', 'Vegetativo temprano', 'Vegetativo tardío', 'Floración temprana', 'Floración tardía', 'Maduración']
      },
      {
        name: 'macroRatios',
        label: 'Relaciones N-P-K',
        type: 'text',
        placeholder: 'Ej. 3-1-2'
      },
      {
        name: 'microNutrients',
        label: 'Micronutrientes',
        type: 'textarea'
      },
      {
        name: 'applicationFrequency',
        label: 'Frecuencia de aplicación',
        type: 'text'
      },
      {
        name: 'waterQuality',
        label: 'Calidad de agua base',
        type: 'textarea',
        placeholder: 'EC, dureza, tratamientos'
      },
      {
        name: 'notes',
        label: 'Observaciones y ajustes',
        type: 'textarea'
      }
    ],
    keyRelations: ['irrigationEvents']
  },
  {
    id: 'substrateMetrics',
    label: 'Monitoreo de Sustrato / Raíces',
    description:
      'Control de parámetros físicos y químicos del sustrato o solución radicular.',
    lifecycleStage: 'Vegetativo / Floración',
    fields: [
      {
        name: 'batchCode',
        label: 'Lote',
        type: 'select',
        optionsReference: 'batches',
        required: true
      },
      {
        name: 'samplingDate',
        label: 'Fecha de muestreo',
        type: 'datetime-local',
        required: true
      },
      {
        name: 'substrateType',
        label: 'Tipo de sustrato',
        type: 'select',
        options: ['Coco', 'Turba', 'Suelo vivo', 'Hidroponía', 'Aeroponía']
      },
      { name: 'ec', label: 'EC (mS/cm)', type: 'number', step: 0.01 },
      { name: 'ph', label: 'pH', type: 'number', step: 0.01 },
      { name: 'moisture', label: 'Humedad (%)', type: 'number', step: 0.1 },
      {
        name: 'mediaTemperature',
        label: 'Temperatura (°C)',
        type: 'number',
        step: 0.1
      },
      {
        name: 'oxygenation',
        label: 'Oxigenación / D.O. (mg/L)',
        type: 'number',
        step: 0.1
      },
      {
        name: 'microbialActivity',
        label: 'Actividad microbiana',
        type: 'textarea',
        placeholder: 'Recuento CFU, inoculaciones, observaciones'
      }
    ],
    keyRelations: ['irrigationEvents']
  },
  {
    id: 'pestIncidents',
    label: 'Plagas, Enfermedades y Estrés',
    description:
      'Gestión fitosanitaria con trazabilidad de monitoreos, umbrales y acciones correctivas.',
    lifecycleStage: 'Todo el ciclo',
    fields: [
      {
        name: 'dateDetected',
        label: 'Fecha detección',
        type: 'datetime-local',
        required: true
      },
      {
        name: 'batchCode',
        label: 'Lote / Sala',
        type: 'select',
        optionsReference: 'batches'
      },
      {
        name: 'plantTag',
        label: 'Planta afectada',
        type: 'select',
        optionsReference: 'plantRecords'
      },
      {
        name: 'issueType',
        label: 'Tipo de incidencia',
        type: 'multiSelect',
        options: ['Plaga', 'Enfermedad', 'Fisiopatía', 'Estrés ambiental']
      },
      {
        name: 'organism',
        label: 'Agente causal / Plaga',
        type: 'text',
        placeholder: 'Ej. Botrytis cinerea, Tetranychus urticae'
      },
      {
        name: 'severity',
        label: 'Severidad',
        type: 'select',
        options: ['Baja', 'Media', 'Alta']
      },
      {
        name: 'treatment',
        label: 'Tratamiento aplicado',
        type: 'textarea',
        placeholder: 'Producto, dosis, responsable, periodo de carencia'
      },
      {
        name: 'followUp',
        label: 'Seguimiento',
        type: 'textarea'
      }
    ],
    keyRelations: ['taskCalendar', 'labResults']
  },
  {
    id: 'growthObservations',
    label: 'Observaciones de Crecimiento',
    description:
      'Notas agronómicas y mediciones no instrumentales para correlacionar prácticas de cultivo con resultados.',
    lifecycleStage: 'Todo el ciclo',
    fields: [
      {
        name: 'observationDate',
        label: 'Fecha',
        type: 'datetime-local',
        required: true
      },
      {
        name: 'plantTag',
        label: 'Planta observada',
        type: 'select',
        optionsReference: 'plantRecords'
      },
      {
        name: 'growthRate',
        label: 'Tasa de crecimiento (cm/día)',
        type: 'number',
        step: 0.1
      },
      {
        name: 'nodeCount',
        label: 'Número de nudos',
        type: 'number',
        min: 0
      },
      {
        name: 'trainingTechniques',
        label: 'Técnicas de entrenamiento aplicadas',
        type: 'multiSelect',
        options: ['LST', 'HST', 'SCROG', 'SOG', 'Main-lining', 'Despuntes']
      },
      {
        name: 'aromaNotes',
        label: 'Notas de aroma / terpenos percibidos',
        type: 'textarea'
      },
      {
        name: 'photos',
        label: 'Referencias fotográficas (URL)',
        type: 'textarea'
      }
    ],
    keyRelations: ['pestIncidents']
  },
  {
    id: 'labResults',
    label: 'Resultados de Laboratorio',
    description:
      'Analíticas internas o externas para validar parámetros de calidad: cannabinoides, terpenos, contaminantes.',
    lifecycleStage: 'Floración / Post-cosecha',
    fields: [
      {
        name: 'sampleId',
        label: 'Código de muestra',
        type: 'text',
        required: true
      },
      {
        name: 'batchCode',
        label: 'Lote asociado',
        type: 'select',
        optionsReference: 'batches',
        required: true
      },
      {
        name: 'analysisDate',
        label: 'Fecha de análisis',
        type: 'date',
        required: true
      },
      {
        name: 'laboratory',
        label: 'Laboratorio / Método',
        type: 'textarea'
      },
      {
        name: 'thcPercent',
        label: 'THC total (%)',
        type: 'number',
        step: 0.01
      },
      {
        name: 'cbdPercent',
        label: 'CBD total (%)',
        type: 'number',
        step: 0.01
      },
      {
        name: 'minorCannabinoids',
        label: 'Otros cannabinoides',
        type: 'textarea',
        placeholder: 'CBG, CBN, CBC, THCV, etc.'
      },
      {
        name: 'terpeneProfile',
        label: 'Perfil de terpenos (mg/g)',
        type: 'textarea'
      },
      {
        name: 'contaminants',
        label: 'Contaminantes / Inocuidad',
        type: 'textarea',
        placeholder: 'Metales pesados, pesticidas, microbiología'
      }
    ],
    keyRelations: ['harvests', 'qualityAudits']
  },
  {
    id: 'harvests',
    label: 'Cosechas',
    description:
      'Registro de la cosecha: programación, pesos frescos y secos, eficiencia y destino del material.',
    lifecycleStage: 'Cosecha',
    fields: [
      {
        name: 'harvestCode',
        label: 'Código de cosecha',
        type: 'text',
        required: true
      },
      {
        name: 'batchCode',
        label: 'Lote cosechado',
        type: 'select',
        optionsReference: 'batches',
        required: true
      },
      {
        name: 'harvestDate',
        label: 'Fecha de cosecha',
        type: 'date',
        required: true
      },
      {
        name: 'harvestTeam',
        label: 'Equipo responsable',
        type: 'textarea'
      },
      {
        name: 'freshWeight',
        label: 'Peso fresco total (kg)',
        type: 'number',
        step: 0.01
      },
      {
        name: 'trimStrategy',
        label: 'Estrategia de manicurado',
        type: 'select',
        options: ['En húmedo', 'En seco', 'Mixto']
      },
      {
        name: 'wasteDisposal',
        label: 'Gestión de residuos',
        type: 'textarea',
        placeholder: 'Subproductos, compostaje, destrucción controlada'
      },
      {
        name: 'notes',
        label: 'Observaciones',
        type: 'textarea'
      }
    ],
    keyRelations: ['dryingSessions', 'inventoryLots']
  },
  {
    id: 'dryingSessions',
    label: 'Secado',
    description:
      'Control de secaderos, parámetros ambientales, tiempos y pérdidas de humedad.',
    lifecycleStage: 'Post-cosecha',
    fields: [
      {
        name: 'dryingCode',
        label: 'Código de secado',
        type: 'text',
        required: true
      },
      {
        name: 'harvestCode',
        label: 'Cosecha asociada',
        type: 'select',
        optionsReference: 'harvests',
        required: true
      },
      {
        name: 'dryRoom',
        label: 'Sala de secado',
        type: 'text'
      },
      {
        name: 'startDate',
        label: 'Inicio',
        type: 'datetime-local',
        required: true
      },
      {
        name: 'endDate',
        label: 'Fin',
        type: 'datetime-local'
      },
      { name: 'avgTemperature', label: 'Temperatura promedio (°C)', type: 'number', step: 0.1 },
      { name: 'avgHumidity', label: 'Humedad promedio (%)', type: 'number', step: 0.1 },
      {
        name: 'airFlow',
        label: 'Flujo de aire / Renovaciones',
        type: 'textarea'
      },
      {
        name: 'dryWeight',
        label: 'Peso seco final (kg)',
        type: 'number',
        step: 0.01
      },
      {
        name: 'notes',
        label: 'Observaciones y control de mohos',
        type: 'textarea'
      }
    ],
    keyRelations: ['curingSessions']
  },
  {
    id: 'curingSessions',
    label: 'Curado y Acondicionamiento',
    description:
      'Proceso de estabilización de flores secas para garantizar calidad organoléptica y estabilidad química.',
    lifecycleStage: 'Post-cosecha',
    fields: [
      {
        name: 'curingCode',
        label: 'Código de curado',
        type: 'text',
        required: true
      },
      {
        name: 'dryingCode',
        label: 'Secado asociado',
        type: 'select',
        optionsReference: 'dryingSessions',
        required: true
      },
      {
        name: 'curingMethod',
        label: 'Método',
        type: 'select',
        options: ['Frascos controlados', 'Ambiente controlado', 'Cámara con humedad controlada']
      },
      {
        name: 'startDate',
        label: 'Inicio',
        type: 'datetime-local',
        required: true
      },
      {
        name: 'burpingFrequency',
        label: 'Frecuencia de ventilación',
        type: 'text',
        placeholder: 'Ej. 2 veces al día'
      },
      {
        name: 'aw',
        label: 'Actividad de agua (Aw)',
        type: 'number',
        step: 0.01
      },
      {
        name: 'stabilizationTests',
        label: 'Pruebas de estabilidad',
        type: 'textarea',
        placeholder: 'Lecturas HR, actividad microbiana, terpenos'
      },
      {
        name: 'releaseDate',
        label: 'Fecha liberación a inventario',
        type: 'date'
      },
      {
        name: 'notes',
        label: 'Observaciones',
        type: 'textarea'
      }
    ],
    keyRelations: ['inventoryLots', 'labResults']
  },
  {
    id: 'inventoryLots',
    label: 'Inventario y Destino Final',
    description:
      'Control de lotes terminados, empaques, etiquetado y trazabilidad hacia clientes internos o externos.',
    lifecycleStage: 'Post-cosecha',
    fields: [
      {
        name: 'inventoryCode',
        label: 'Código de inventario',
        type: 'text',
        required: true
      },
      {
        name: 'sourceCuring',
        label: 'Curado origen',
        type: 'select',
        optionsReference: 'curingSessions'
      },
      {
        name: 'productType',
        label: 'Tipo de producto',
        type: 'select',
        options: ['Flor seca', 'Biomasa', 'Extracto crudo', 'Destilado', 'Producto terminado']
      },
      {
        name: 'finalWeight',
        label: 'Peso neto (kg)',
        type: 'number',
        step: 0.01
      },
      {
        name: 'packaging',
        label: 'Sistema de empaque',
        type: 'textarea',
        placeholder: 'Material, tamaño, sellado, atmósfera modificada'
      },
      {
        name: 'destination',
        label: 'Destino / Cliente',
        type: 'textarea'
      },
      {
        name: 'complianceDocs',
        label: 'Documentación asociada',
        type: 'textarea',
        placeholder: 'COA, guías de traslado, certificados GMP'
      }
    ],
    keyRelations: ['labResults', 'qualityAudits']
  },
  {
    id: 'qualityAudits',
    label: 'Auditorías y Cumplimiento',
    description:
      'Historial de auditorías internas y externas, hallazgos y planes de acción.',
    lifecycleStage: 'Todo el ciclo',
    fields: [
      {
        name: 'auditName',
        label: 'Nombre / Tipo de auditoría',
        type: 'text',
        required: true
      },
      {
        name: 'auditDate',
        label: 'Fecha',
        type: 'date',
        required: true
      },
      {
        name: 'scope',
        label: 'Alcance',
        type: 'textarea',
        placeholder: 'GACP, GMP, Bioseguridad, Seguridad laboral'
      },
      {
        name: 'findings',
        label: 'Hallazgos',
        type: 'textarea'
      },
      {
        name: 'actionPlans',
        label: 'Planes de acción',
        type: 'textarea'
      },
      {
        name: 'status',
        label: 'Estado',
        type: 'select',
        options: ['Pendiente', 'En curso', 'Cerrado']
      },
      {
        name: 'responsible',
        label: 'Responsable',
        type: 'text'
      }
    ],
    keyRelations: ['taskCalendar', 'labResults']
  }
];

export const entityMap = cultivationEntities.reduce((acc, entity) => {
  acc[entity.id] = entity;
  return acc;
}, {});

export const databaseMetadata = {
  version: '1.0.0',
  author: 'Equipo Agronómico',
  description:
    'Modelo de datos integral para la planificación, gestión y trazabilidad completa de cultivos profesionales de Cannabis sativa L., adaptable a escalas micro a industriales.',
  lifecycleCoverage: [
    'Pre-producción',
    'Germinación',
    'Propagación',
    'Vegetativo',
    'Floración',
    'Cosecha',
    'Secado',
    'Curado',
    'Post-cosecha y distribución'
  ],
  kpis: [
    'Rendimiento g/m²',
    'Eficiencia hídrica L/kg',
    'Consumo energético kWh/kg',
    'Tiempo de ciclo completo',
    'Índice de cumplimiento de auditorías',
    'Consistencia de cannabinoides (desviación estándar)'
  ]
};
