import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useData } from '../hooks/useData.js';

const getDefaultValue = (field) => {
  if (field.type === 'multiSelect') return [];
  if (field.type === 'number') return '';
  return '';
};

const normalizeValue = (field, value) => {
  if (field.type === 'number') {
    if (value === '' || value === null) return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  if (field.type === 'multiSelect') {
    return Array.isArray(value) ? value : value ? [value] : [];
  }
  return value ?? '';
};

const deriveLabel = (record) =>
  record.identifier ||
  record.batchCode ||
  record.roomCode ||
  record.plantTag ||
  record.sampleId ||
  record.harvestCode ||
  record.dryingCode ||
  record.curingCode ||
  record.inventoryCode ||
  record.planName ||
  record.taskName ||
  record.geneticName ||
  record.id;

export default function RecordForm({ entity, initialValues, onCancel, onSubmit }) {
  const { data } = useData();
  const [formValues, setFormValues] = useState(() => {
    const defaults = {};
    entity.fields.forEach((field) => {
      const currentValue = initialValues?.[field.name];
      if (field.type === 'multiSelect') {
        defaults[field.name] = Array.isArray(currentValue)
          ? currentValue
          : currentValue
            ? String(currentValue)
                .split(',')
                .map((item) => item.trim())
            : [];
      } else if (field.type === 'number') {
        defaults[field.name] = currentValue ?? '';
      } else {
        defaults[field.name] = currentValue ?? getDefaultValue(field);
      }
    });
    return defaults;
  });

  const referenceOptions = useMemo(() => {
    const options = {};
    entity.fields
      .filter((field) => field.optionsReference)
      .forEach((field) => {
        const referenceRecords = data[field.optionsReference] ?? [];
        options[field.name] = referenceRecords.map((record) => ({
          value: record.id,
          label: deriveLabel(record)
        }));
      });
    return options;
  }, [data, entity.fields]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field.name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {};
    entity.fields.forEach((field) => {
      const value = formValues[field.name];
      payload[field.name] = normalizeValue(field, value);
    });
    onSubmit(payload);
  };

  return (
    <form className="record-form" onSubmit={handleSubmit}>
      <div className="record-form__grid">
        {entity.fields.map((field) => {
          const inputId = `${entity.id}-${field.name}`;
          const value = formValues[field.name];
          const isRequired = Boolean(field.required);
          const commonProps = {
            id: inputId,
            name: field.name,
            value: value ?? '',
            onChange: (event) => handleChange(field, event.target.value),
            required: isRequired,
            placeholder: field.placeholder || ''
          };

          let inputElement = null;

          if (field.type === 'textarea') {
            inputElement = <textarea {...commonProps} rows={4} />;
          } else if (field.type === 'select' && field.optionsReference) {
            inputElement = (
              <select
                {...commonProps}
                value={value ?? ''}
                onChange={(event) => handleChange(field, event.target.value)}
              >
                <option value="">Seleccionar...</option>
                {(referenceOptions[field.name] || []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          } else if (field.type === 'select') {
            inputElement = (
              <select {...commonProps} value={value ?? ''}>
                <option value="">Seleccionar...</option>
                {(field.options || []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            );
          } else if (field.type === 'multiSelect') {
            inputElement = (
              <select
                id={inputId}
                name={field.name}
                multiple
                value={value || []}
                onChange={(event) =>
                  handleChange(
                    field,
                    Array.from(event.target.selectedOptions).map((option) => option.value)
                  )
                }
              >
                {(field.options || []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            );
          } else if (field.type === 'number') {
            inputElement = (
              <input
                {...commonProps}
                type="number"
                step={field.step ?? 'any'}
                min={field.min}
                max={field.max}
              />
            );
          } else {
            inputElement = <input {...commonProps} type={field.type || 'text'} />;
          }

          return (
            <label className="record-form__field" htmlFor={inputId} key={field.name}>
              <span className="record-form__label">
                {field.label}
                {isRequired ? <span className="record-form__required">*</span> : null}
                {field.unit ? <span className="record-form__unit">({field.unit})</span> : null}
              </span>
              {inputElement}
              {field.description ? (
                <span className="record-form__help">{field.description}</span>
              ) : null}
            </label>
          );
        })}
      </div>
      <div className="record-form__actions">
        <button type="submit" className="button button--primary">
          Guardar
        </button>
        <button type="button" className="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

RecordForm.propTypes = {
  entity: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};