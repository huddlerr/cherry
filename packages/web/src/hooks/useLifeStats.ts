import { useState, useCallback, useMemo } from 'react';
import { 
  calculateAllStats, 
  isValidBirthdate,
  type AllStats 
} from '@belvrr/core';

interface UseLifeStatsReturn {
  birthdate: string | null;
  stats: AllStats | null;
  isValid: boolean;
  setBirthdate: (date: string) => void;
  reset: () => void;
}

/**
 * Hook to manage life statistics calculations
 */
export function useLifeStats(initialBirthdate?: string): UseLifeStatsReturn {
  const [birthdate, setBirthdateState] = useState<string | null>(
    initialBirthdate && isValidBirthdate(initialBirthdate) 
      ? initialBirthdate 
      : null
  );

  const stats = useMemo(() => {
    if (!birthdate || !isValidBirthdate(birthdate)) {
      return null;
    }
    return calculateAllStats(birthdate);
  }, [birthdate]);

  const isValid = useMemo(() => {
    return birthdate !== null && isValidBirthdate(birthdate);
  }, [birthdate]);

  const setBirthdate = useCallback((date: string) => {
    if (isValidBirthdate(date)) {
      setBirthdateState(date);
    }
  }, []);

  const reset = useCallback(() => {
    setBirthdateState(null);
  }, []);

  return {
    birthdate,
    stats,
    isValid,
    setBirthdate,
    reset,
  };
}
