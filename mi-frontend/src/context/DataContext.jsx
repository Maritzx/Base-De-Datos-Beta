import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { cultivationEntities } from '../data/schema.js';
import { sampleDataset } from '../data/sampleData.js';

const STORAGE_KEY = 'cultivation-database-v1';

const buildEmptyDataset = () =>
  cultivationEntities.reduce((acc, entity) => {
    acc[entity.id] = [];
    return acc;
  }, {});

const mergeWithSchema = (dataset) => {
  const base = buildEmptyDataset();
  return Object.keys(base).reduce((acc, entityId) => {
    acc[entityId] = dataset?.[entityId] ? [...dataset[entityId]] : [];
    return acc;
  }, {});
};

const initialData = mergeWithSchema(sampleDataset);

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    if (typeof window === 'undefined') {
      return initialData;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return mergeWithSchema(parsed);
      }
    } catch (error) {
      console.warn('No se pudo recuperar la base local:', error);
    }

    return initialData;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const upsertRecord = useCallback((entityId, record) => {
    setData((prev) => {
      const currentRecords = prev[entityId] ?? [];
      const now = new Date().toISOString();
      const recordId = record.id ?? `${entityId}-${Date.now()}`;
      const existingIndex = currentRecords.findIndex((item) => item.id === recordId);
      const enrichedRecord = {
        ...record,
        id: recordId,
        updatedAt: now,
        createdAt: record.createdAt ?? now
      };

      if (existingIndex >= 0) {
        const updatedRecords = [...currentRecords];
        updatedRecords[existingIndex] = enrichedRecord;
        return { ...prev, [entityId]: updatedRecords };
      }

      return { ...prev, [entityId]: [...currentRecords, enrichedRecord] };
    });
  }, []);

  const deleteRecord = useCallback((entityId, recordId) => {
    setData((prev) => ({
      ...prev,
      [entityId]: (prev[entityId] ?? []).filter((item) => item.id !== recordId)
    }));
  }, []);

  const resetData = useCallback(() => {
    setData(initialData);
  }, []);

  const value = useMemo(
    () => ({
      data,
      upsertRecord,
      deleteRecord,
      resetData,
      storageKey: STORAGE_KEY
    }),
    [data, upsertRecord, deleteRecord, resetData]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
  }