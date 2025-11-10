export const sampleDataset = {
  growRooms: [
    {
      id: 'room-flora',
      roomCode: 'FLORA-3X3',
      roomName: 'Sala de flora 3x3',
      dimensions: '3 x 3',
      areaM2: 9,
      intendedStage: 'Floración',
      lighting: ['LED'],
      environmentalTargets: 'Temperatura 24-26 °C, HR 50-55 %, PPFD 800-900',
      notes: 'Dos sistemas RDWC 8x1 funcionando en espejo'
    },
    {
      id: 'room-veg',
      roomCode: 'VEG-3X3',
      roomName: 'Sala de vegetación',
      dimensions: '3 x 3',
      areaM2: 9,
      intendedStage: 'Vegetación',
      lighting: ['LED'],
      environmentalTargets: 'Temperatura 24 °C, HR 65 %, PPFD 400-500',
      notes: 'Transición semanal hacia flora'
    },
    {
      id: 'room-carpa',
      roomCode: 'CARPA-1X1',
      roomName: 'Carpa madres y esquejes',
      dimensions: '1 x 1',
      areaM2: 1,
      intendedStage: 'Propagación',
      lighting: ['LED'],
      environmentalTargets: 'Temperatura 24 °C, HR 70 %, PPFD 200',
      notes: 'Incluye bandeja de madres y esquejera hidroponica 50 slots'
    }
  ],
  hydroponicSystems: [
    {
      id: 'system-flora-a',
      systemCode: 'FLORA-A',
      systemName: 'RDWC Flora A',
      roomId: 'room-flora',
      systemType: 'RDWC',
      bucketCount: 8,
      plantCapacity: 8,
      reservoirVolume: 20,
      bucketVolume: 20,
      sensors: ['EC', 'pH', 'Temperatura agua'],
      notes: 'Línea izquierda, conectada a deshumificador'
    },
    {
      id: 'system-flora-b',
      systemCode: 'FLORA-B',
      systemName: 'RDWC Flora B',
      roomId: 'room-flora',
      systemType: 'RDWC',
      bucketCount: 8,
      plantCapacity: 8,
      reservoirVolume: 20,
      bucketVolume: 20,
      sensors: ['ORP', 'EC', 'pH', 'Temperatura agua'],
      notes: 'Línea derecha, control automatizado de ORP'
    },
    {
      id: 'system-veg',
      systemCode: 'VEG-8X1',
      systemName: 'RDWC Vegetación',
      roomId: 'room-veg',
      systemType: 'RDWC',
      bucketCount: 8,
      plantCapacity: 8,
      reservoirVolume: 20,
      bucketVolume: 20,
      sensors: ['EC', 'pH'],
      notes: 'Se rota semanalmente hacia flora'
    },
    {
      id: 'system-madres',
      systemCode: 'MAD-TRAY',
      systemName: 'Bandeja madres 1x1',
      roomId: 'room-carpa',
      systemType: 'Bandeja propagación',
      bucketCount: 12,
      plantCapacity: 12,
      reservoirVolume: 12,
      bucketVolume: 1,
      sensors: ['EC', 'pH'],
      notes: 'Soporta madres en macetas de 3 L'
    },
    {
      id: 'system-esquejera',
      systemCode: 'CLON-50',
      systemName: 'Esquejera 50 slots',
      roomId: 'room-carpa',
      systemType: 'Bandeja propagación',
      bucketCount: 50,
      plantCapacity: 50,
      reservoirVolume: 15,
      bucketVolume: 0.3,
      sensors: ['Temperatura agua'],
      notes: 'Burbujas con piedra difusora'
    }
  ],
  geneticCatalog: [
    {
      id: 'gen-cbd-01',
      geneticCode: 'CBD-LOT-01',
      strainName: 'CBD Therapy',
      breeder: 'CBD Crew',
      dominantProfile: 'CBD dominante',
      thcPresence: 'Sí',
      cbdPresence: 'Sí',
      inaseRegistered: 'En trámite',
      floweringWeeks: 9,
      notes: 'Ideal para extracciones ricas en CBD'
    },
    {
      id: 'gen-thc-01',
      geneticCode: 'THC-LOT-01',
      strainName: 'Tropicanna Poison',
      breeder: 'Sweet Seeds',
      dominantProfile: 'THC dominante',
      thcPresence: 'Sí',
      cbdPresence: 'No',
      inaseRegistered: 'No',
      floweringWeeks: 8.5,
      notes: 'Fenotipo morado, requiere PPFD alto'
    }
  ],
  cultivationBatches: [
    {
      id: 'batch-flora-marzo',
      batchCode: 'L-FLORA-2025-03',
      geneticId: 'gen-thc-01',
      startDate: '2025-03-01',
      stage: 'Floración',
      roomId: 'room-flora',
      systemId: 'system-flora-a',
      plantCount: 8,
      targetFloweringWeeks: 8.5,
      notes: 'Entró desde vegetación el 1/3 con 25 días de crecimiento'
    },
    {
      id: 'batch-veg-marzo',
      batchCode: 'L-VEG-2025-03',
      geneticId: 'gen-cbd-01',
      startDate: '2025-02-15',
      stage: 'Vegetación',
      roomId: 'room-veg',
      systemId: 'system-veg',
      plantCount: 8,
      targetFloweringWeeks: 9,
      notes: 'Se traslada a flora tras selección de fenotipos'
    }
  ],
  environmentReadings: [
    {
      id: 'env-flora-a-01',
      timestamp: '2025-03-05T09:00',
      roomId: 'room-flora',
      systemId: 'system-flora-a',
      batchId: 'batch-flora-marzo',
      orp: 320,
      ec: 2.1,
      ph: 5.8,
      humidity: 52,
      ppfd: 850,
      ambientTemperature: 25.4,
      waterTemperature: 20.8,
      notes: 'Lectura dentro del rango ideal'
    },
    {
      id: 'env-veg-01',
      timestamp: '2025-03-05T08:30',
      roomId: 'room-veg',
      systemId: 'system-veg',
      batchId: 'batch-veg-marzo',
      orp: 0,
      ec: 1.4,
      ph: 5.9,
      humidity: 64,
      ppfd: 420,
      ambientTemperature: 24.2,
      waterTemperature: 21.1,
      notes: 'Ajustar ventilación para bajar HR en la tarde'
    }
  ],
  harvestRecords: [
    {
      id: 'harvest-flora-enero',
      harvestCode: 'HARV-FLORA-2025-01',
      harvestDate: '2025-01-28',
      batchId: 'batch-flora-marzo',
      geneticId: 'gen-thc-01',
      systemId: 'system-flora-b',
      floweringWeeks: 8.3,
      dryWeight: 2850,
      trimNotes: 'Secado en 10 días, se guardó en frascos 2L'
    }
  ],
  cycleComparisons: [
    {
      id: 'comparison-q1',
      comparisonId: 'COMP-Q1-2025',
      period: 'Floraciones Q1 2025',
      geneticId: 'gen-thc-01',
      systemId: 'system-flora-b',
      batchSummary: 'HARV-FLORA-2025-01 vs L-FLORA-2025-03 (en curso)',
      avgDryYield: 2820,
      avgPPFD: 840,
      avgEC: 2.05,
      observations: 'Mantener PPFD > 800 y revisar ORP semanalmente'
    }
  ]
};
