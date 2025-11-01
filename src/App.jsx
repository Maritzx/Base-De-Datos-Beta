import { useMemo, useState } from 'react';
import { cultivationEntities, databaseMetadata, entityMap } from './data/schema.js';
import SummaryPanel from './components/SummaryPanel.jsx';
import EntityDetail from './components/EntityDetail.jsx';
import './styles/app.css';

const DEFAULT_ENTITY_ID = cultivationEntities[0].id;

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState(DEFAULT_ENTITY_ID);

  const filteredEntities = useMemo(() => {
    if (!searchTerm) return cultivationEntities;
    const normalized = searchTerm.trim().toLowerCase();
    return cultivationEntities.filter((entity) => {
      const haystack = `${entity.label} ${entity.description} ${entity.lifecycleStage}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [searchTerm]);

  const hasSelectedEntity = filteredEntities.some((entity) => entity.id === selectedEntity);
  const activeEntity = hasSelectedEntity
    ? entityMap[selectedEntity]
    : filteredEntities[0] || entityMap[selectedEntity];

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>Base de datos integral Cannabis sativa L.</h1>
          <p>
            {databaseMetadata.description}
          </p>
        </div>
        <div className="app__search">
          <input
            type="search"
            placeholder="Buscar entidad o etapa"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </header>

      <div className="app__layout">
        <nav className="app__nav">
          <h2>Entidades</h2>
          <ul>
            {filteredEntities.map((entity) => (
              <li key={entity.id}>
                <button
                  type="button"
                  className={entity.id === activeEntity.id ? 'active' : ''}
                  onClick={() => setSelectedEntity(entity.id)}
                >
                  <span className="entity-name">{entity.label}</span>
                  <span className="entity-stage">{entity.lifecycleStage}</span>
                </button>
              </li>
            ))}
            {!filteredEntities.length ? <li>No se encontraron entidades.</li> : null}
          </ul>
        </nav>

        <main className="app__content">
          {activeEntity ? <EntityDetail entity={activeEntity} /> : <p>Selecciona una entidad.</p>}
        </main>

        <SummaryPanel metadata={databaseMetadata} entities={cultivationEntities} />
      </div>
    </div>
  );
}
