import { useMemo } from 'react';
import { useData } from '../hooks/useData.js';

export default function SummaryPanel({ metadata, entities }) {
  const { data, storageKey } = useData();

  const totals = useMemo(() => {
    const totalRecords = entities.reduce((sum, entity) => sum + (data[entity.id]?.length ?? 0), 0);
    const phasesCovered = new Set(entities.map((entity) => entity.lifecycleStage));
    return {
      totalRecords,
      phasesCovered: phasesCovered.size,
      entityCount: entities.length
    };
  }, [data, entities]);

  return (
    <aside className="summary-panel">
      <h2>Resumen del modelo</h2>
      <dl>
        <div>
          <dt>Versión</dt>
          <dd>{metadata.version}</dd>
        </div>
        <div>
          <dt>Responsable</dt>
          <dd>{metadata.author}</dd>
        </div>
        <div>
          <dt>Entidades</dt>
          <dd>{totals.entityCount}</dd>
        </div>
        <div>
          <dt>Registros totales</dt>
          <dd>{totals.totalRecords}</dd>
        </div>
        <div>
          <dt>Etapas cubiertas</dt>
          <dd>{totals.phasesCovered}</dd>
        </div>
        <div>
          <dt>Clave de almacenamiento local</dt>
          <dd>{storageKey}</dd>
        </div>
      </dl>
      <section>
        <h3>KPI estratégicos</h3>
        <ul>
          {metadata.kpis.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Etapas del ciclo</h3>
        <ul>
          {metadata.lifecycleCoverage.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </aside>
  );
}