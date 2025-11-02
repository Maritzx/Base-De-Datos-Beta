const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (value === undefined || value === null || value === '') {
    return '—';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
};

export default function EntityTable({ entity, records, onDelete, onEdit }) {
  if (!records.length) {
    return <p className="entity-table__empty">No hay registros cargados.</p>;
  }

  return (
    <div className="entity-table">
      <table>
        <thead>
          <tr>
            {entity.fields.map((field) => (
              <th key={field.name}>{field.label}</th>
            ))}
            <th>Creado</th>
            <th>Actualizado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              {entity.fields.map((field) => (
                <td key={field.name}>{formatValue(record[field.name])}</td>
              ))}
              <td>{record.createdAt ? new Date(record.createdAt).toLocaleString() : '—'}</td>
              <td>{record.updatedAt ? new Date(record.updatedAt).toLocaleString() : '—'}</td>
              <td className="entity-table__actions">
                <button type="button" onClick={() => onEdit(record)}>
                  Editar
                </button>
                <button type="button" onClick={() => onDelete(record.id)} className="danger">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}