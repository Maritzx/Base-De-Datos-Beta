import { useMemo, useState } from 'react';
import { useData } from '../hooks/useData.js';
import EntityTable from './EntityTable.jsx';
import RecordForm from './RecordForm.jsx';

const formatRelations = (relations) => {
  if (!relations || !relations.length) return 'No definidas';
  return relations.join(', ');
};

export default function EntityDetail({ entity }) {
  const { data, upsertRecord, deleteRecord } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const records = data[entity.id] ?? [];

  const totalRecords = records.length;
  const lastUpdated = useMemo(() => {
    if (!records.length) return null;
    return records.reduce((latest, record) => {
      const updatedAt = record.updatedAt || record.createdAt;
      if (!updatedAt) return latest;
      const current = new Date(updatedAt).getTime();
      return current > latest ? current : latest;
    }, 0);
  }, [records]);

  const handleCreate = () => {
    setRecordToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (record) => {
    setRecordToEdit(record);
    setIsFormOpen(true);
  };

  const handleDelete = (recordId) => {
    if (window.confirm('¿Eliminar este registro?')) {
      deleteRecord(entity.id, recordId);
    }
  };

  const handleSubmit = (values) => {
    upsertRecord(entity.id, { ...recordToEdit, ...values });
    setRecordToEdit(null);
    setIsFormOpen(false);
  };

  return (
    <section className="entity-detail">
      <header className="entity-detail__header">
        <div>
          <h2>{entity.label}</h2>
          <p className="entity-detail__stage">Etapa: {entity.lifecycleStage}</p>
          <p className="entity-detail__description">{entity.description}</p>
          <p className="entity-detail__relations">
            Relaciones clave: <strong>{formatRelations(entity.keyRelations)}</strong>
          </p>
        </div>
        <div className="entity-detail__stats">
          <span className="stat">
            Registros
            <strong>{totalRecords}</strong>
          </span>
          <span className="stat">
            Última actualización
            <strong>{lastUpdated ? new Date(lastUpdated).toLocaleString() : '—'}</strong>
          </span>
          <button type="button" className="button button--primary" onClick={handleCreate}>
            Añadir registro
          </button>
        </div>
      </header>

      {isFormOpen ? (
        <div className="entity-detail__form">
          <h3>{recordToEdit ? 'Editar registro' : 'Nuevo registro'}</h3>
          <RecordForm
            entity={entity}
            initialValues={recordToEdit}
            onCancel={() => {
              setRecordToEdit(null);
              setIsFormOpen(false);
            }}
            onSubmit={handleSubmit}
          />
        </div>
      ) : null}

      <EntityTable entity={entity} records={records} onDelete={handleDelete} onEdit={handleEdit} />
    </section>
  );
}

