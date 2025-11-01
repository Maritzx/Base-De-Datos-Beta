export const sampleDataset = {
  genetics: [
    {
      id: 'genetics-aurora',
      identifier: 'GEN-001',
      sourceType: 'Semilla',
      geneticName: 'Aurora Borealis CBD',
      breeder: 'North Labs',
      chemotype: ['III (CBD alto)'],
      certifications: 'Licencia sanitaria 2025-AB12',
      storageConditions: '4 °C, HR 40 %, atmósfera modificada',
      germinationRate: 95,
      notes: 'Lote de alta uniformidad fenotípica'
    }
  ],
  propagationRooms: [
    {
      id: 'prop-room-1',
      roomCode: 'PROP-01',
      capacity: 1200,
      lightingType: ['LED'],
      hvac: 'Filtración HEPA, presión positiva, recambio 30 ACH',
      sanitationProtocol: 'Ingreso por esclusa, ropa desechable, desinfección UV',
      monitoringSystems: ['Sensores ambientales', 'IoT'],
      notes: 'Control automatizado vinculado a BMS'
    }
  ],
  batches: [
    {
      id: 'batch-q1-2025',
      batchCode: 'L-2025-Q1',
      startDate: '2025-01-15',
      originMaterial: 'genetics-aurora',
      propagationRoom: 'prop-room-1',
      productionScale: 'Industrial',
      cultivationSystem: ['Invernadero', 'Coco'],
      targetYield: 95,
      targetCannabinoids: 'CBD 11-13 %, THC < 0.6 %, terpenos 1.5 %',
      complianceRequirements: 'GACP, GMP, trazabilidad blockchain',
      notes: 'Implementar sensores de VPD con alarmas SMS'
    }
  ],
  plantRecords: [
    {
      id: 'plant-0001',
      plantTag: 'L-2025-Q1-P001',
      batchCode: 'batch-q1-2025',
      propagationType: 'Esqueje',
      phenotypeNotes: 'Internodos cortos, vigor alto',
      stage: 'Vegetativo',
      healthStatus: 'Óptimo',
      biomass: 320,
      height: 68,
      canopyDiameter: 45,
      notes: 'Aplicado topping semana 4'
    }
  ],
  taskCalendar: [
    {
      id: 'task-root-zone',
      taskName: 'Calibración sensores de riego',
      batchCode: 'batch-q1-2025',
      responsible: 'Equipo fertirriego',
      scheduledDate: '2025-02-01T08:00',
      completedDate: '2025-02-01T11:00',
      taskCategory: ['Mantenimiento', 'Riego'],
      resourcesUsed: '2 técnicos, herramientas de calibración',
      status: 'Completada',
      verification: 'Registro fotográfico en SharePoint'
    }
  ],
  environmentReadings: [
    {
      id: 'env-001',
      timestamp: '2025-02-10T09:00',
      location: 'prop-room-1',
      batchCode: 'batch-q1-2025',
      temperature: 25.4,
      humidity: 60,
      vpd: 0.9,
      co2: 850,
      ppfd: 280,
      photoperiod: 18,
      notes: 'Alertas dentro de rangos óptimos'
    }
  ],
  irrigationEvents: [
    {
      id: 'irrig-001',
      batchCode: 'batch-q1-2025',
      eventDate: '2025-02-11T07:30',
      volumeIn: 450,
      ecIn: 2.2,
      phIn: 5.8,
      runoffPercent: 18,
      ecOut: 2.5,
      phOut: 6.1,
      additives: 'Aminoácidos, Ca/Mg',
      notes: 'Ajustar riego nocturno por baja EC'
    }
  ],
  nutrientPlans: [
    {
      id: 'nut-plan-veg',
      planName: 'Programa vegetativo intensivo',
      batchCode: 'batch-q1-2025',
      stage: 'Vegetativo tardío',
      macroRatios: '3-1-2',
      microNutrients: 'Fe, Zn, B en quelatos',
      applicationFrequency: 'Riego diario con drenaje 20 %',
      waterQuality: 'EC 0.2 mS/cm, ósmosis inversa',
      notes: 'Aplicar silicio foliar semanal'
    }
  ],
  substrateMetrics: [
    {
      id: 'substrate-001',
      batchCode: 'batch-q1-2025',
      samplingDate: '2025-02-09T14:00',
      substrateType: 'Coco',
      ec: 2.3,
      ph: 5.9,
      moisture: 55,
      mediaTemperature: 21.5,
      oxygenation: 7.8,
      microbialActivity: 'Aplicado consorcio de Bacillus sp. semana 3'
    }
  ],
  pestIncidents: [
    {
      id: 'pest-001',
      dateDetected: '2025-02-05T10:30',
      batchCode: 'batch-q1-2025',
      plantTag: 'plant-0001',
      issueType: ['Plaga'],
      organism: 'Trialeurodes vaporariorum',
      severity: 'Baja',
      treatment: 'Liberación de Encarsia formosa 3 ind/m²',
      followUp: 'Monitorear con trampas cromáticas'
    }
  ],
  growthObservations: [
    {
      id: 'growth-001',
      observationDate: '2025-02-08T16:00',
      plantTag: 'plant-0001',
      growthRate: 2.4,
      nodeCount: 12,
      trainingTechniques: ['LST', 'Despuntes'],
      aromaNotes: 'Perfil cítrico, limoneno dominante',
      photos: 'https://intranet.example.com/fotos/plant-0001'
    }
  ],
  labResults: [
    {
      id: 'lab-001',
      sampleId: 'LAB-2025-31',
      batchCode: 'batch-q1-2025',
      analysisDate: '2025-03-28',
      laboratory: 'QALabs, HPLC ISO17025',
      thcPercent: 0.5,
      cbdPercent: 12.4,
      minorCannabinoids: 'CBG 0.4 %, CBC 0.2 %',
      terpeneProfile: 'Limoneno 6 mg/g, Mirceno 3 mg/g, Beta-cariofileno 2.5 mg/g',
      contaminants: 'Sin detecciones (< LOD)'
    }
  ],
  harvests: [
    {
      id: 'harvest-001',
      harvestCode: 'HARV-Q1-2025',
      batchCode: 'batch-q1-2025',
      harvestDate: '2025-03-20',
      harvestTeam: 'Equipo postcosecha A',
      freshWeight: 420,
      trimStrategy: 'En húmedo',
      wasteDisposal: 'Biomasa enviada a compost industrial',
      notes: 'Implementar secado escalonado por densidad'
    }
  ],
  dryingSessions: [
    {
      id: 'dry-001',
      dryingCode: 'DRY-2025-01',
      harvestCode: 'harvest-001',
      dryRoom: 'SEC-01',
      startDate: '2025-03-20T18:00',
      endDate: '2025-03-29T09:00',
      avgTemperature: 18.5,
      avgHumidity: 55,
      airFlow: 'Renovación 20 ACH, ventiladores oscilantes baja velocidad',
      dryWeight: 86,
      notes: 'Variación HR 4 %, sin presencia de mohos'
    }
  ],
  curingSessions: [
    {
      id: 'curing-001',
      curingCode: 'CUR-2025-01',
      dryingCode: 'dry-001',
      curingMethod: 'Frascos controlados',
      startDate: '2025-03-29T12:00',
      burpingFrequency: '3 veces/día primera semana, luego 1 vez/día',
      aw: 0.58,
      stabilizationTests: 'Lecturas HR 58-60 %, recuento microbiano < 10 CFU/g',
      releaseDate: '2025-04-26',
      notes: 'Terpenos estabilizados, aroma persistente'
    }
  ],
  inventoryLots: [
    {
      id: 'inventory-001',
      inventoryCode: 'INV-2025-01',
      sourceCuring: 'curing-001',
      productType: 'Flor seca',
      finalWeight: 80,
      packaging: 'Envase mylar 1 kg con válvula, atmósfera nitrógeno',
      destination: 'Producto medicinal, lote clínico 12-2025',
      complianceDocs: 'COA LAB-2025-31, guía sanitaria 2025-099'
    }
  ],
  qualityAudits: [
    {
      id: 'audit-001',
      auditName: 'Auditoría GMP interna Q1',
      auditDate: '2025-03-05',
      scope: 'Áreas de cultivo, postcosecha, documentación',
      findings: 'Actualización pendiente de POE de limpieza',
      actionPlans: 'Revisión POE 3.2 y capacitación personal',
      status: 'En curso',
      responsible: 'Coordinadora de calidad'
    }
  ]
};

export const emptyDataset = {};