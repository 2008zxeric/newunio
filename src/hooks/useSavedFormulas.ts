import { useState, useEffect, useRef } from 'react';

export interface SavedFormulaItem {
  id: string;
  termId?: string;
  termName?: string;
  date: string;
  title: string;
  concept: string;
  components: string[];
  blendFormula: string;
  carrier: string;
  coaBatch: string;
  aromatherapistNotes?: string;
  isSolarTerm?: boolean;
}

const SAVED_FORMULAS_KEY = 'unio_saved_formulas_v1';

export function useSavedFormulas() {
  const [savedFormulas, setSavedFormulas] = useState<SavedFormulaItem[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_FORMULAS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse saved formulas from localStorage', e);
      return [];
    }
  });

  const lastJsonRef = useRef<string>(JSON.stringify(savedFormulas));

  useEffect(() => {
    try {
      const currentJson = JSON.stringify(savedFormulas);
      if (currentJson !== lastJsonRef.current) {
        lastJsonRef.current = currentJson;
        localStorage.setItem(SAVED_FORMULAS_KEY, currentJson);
        // Dispatch custom event for cross-component sync
        window.dispatchEvent(new Event('unio_saved_formulas_updated'));
      }
    } catch (e) {
      console.error('Failed to save formulas to localStorage', e);
    }
  }, [savedFormulas]);

  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(SAVED_FORMULAS_KEY);
        if (stored && stored !== lastJsonRef.current) {
          lastJsonRef.current = stored;
          setSavedFormulas(JSON.parse(stored));
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('unio_saved_formulas_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('unio_saved_formulas_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const saveFormula = (formula: Omit<SavedFormulaItem, 'id' | 'date'> & { id?: string }) => {
    const newId = formula.id || `FORM-SOLAR-${Date.now()}`;
    const newItem: SavedFormulaItem = {
      ...formula,
      id: newId,
      date: new Date().toISOString().split('T')[0],
    };

    setSavedFormulas((prev) => {
      const exists = prev.some((item) => item.id === newId || (formula.termId && item.termId === formula.termId));
      if (exists) return prev;
      return [newItem, ...prev];
    });
  };

  const removeFormula = (idOrTermId: string) => {
    setSavedFormulas((prev) => prev.filter((item) => item.id !== idOrTermId && item.termId !== idOrTermId));
  };

  const isFormulaSaved = (termIdOrId: string) => {
    return savedFormulas.some((item) => item.id === termIdOrId || item.termId === termIdOrId);
  };

  const toggleSaveFormula = (formula: Omit<SavedFormulaItem, 'id' | 'date'> & { id?: string }) => {
    const targetId = formula.termId || formula.id;
    if (targetId && isFormulaSaved(targetId)) {
      removeFormula(targetId);
      return false;
    } else {
      saveFormula(formula);
      return true;
    }
  };

  return {
    savedFormulas,
    saveFormula,
    removeFormula,
    isFormulaSaved,
    toggleSaveFormula,
  };
}
