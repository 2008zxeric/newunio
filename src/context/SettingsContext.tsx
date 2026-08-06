import React, { createContext, useContext, useState, useEffect } from 'react';
import { OfflineLocation } from '../types';

/**
 * 线下体验店配置（SettingsContext）
 * 默认：成都/宁波/泰国；后台可实时修改（localStorage 持久化）
 */
const DEFAULT_LOCATIONS: OfflineLocation[] = [
  { city: '成都', address: '成都市锦江区红星路三段 99 号银石广场 2F（西南寻香工坊）' },
  { city: '宁波', address: '宁波市鄞州区东部新城和源路 520 号（海风芳疗观察站）' },
  { city: '泰国·芭提雅', address: '芭提雅 Central Pattaya 路 88 号（东南亚热带基地）' },
];

const STORAGE_KEY = 'unio_offline_locations_v1';

interface SettingsContextValue {
  offlineLocations: OfflineLocation[];
  updateOfflineLocations: (locations: OfflineLocation[]) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  offlineLocations: DEFAULT_LOCATIONS,
  updateOfflineLocations: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [offlineLocations, setOfflineLocations] = useState<OfflineLocation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse offline locations', e);
    }
    return DEFAULT_LOCATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(offlineLocations));
    } catch (e) {
      console.error('Failed to save offline locations', e);
    }
  }, [offlineLocations]);

  const updateOfflineLocations = (locations: OfflineLocation[]) => {
    setOfflineLocations(locations);
  };

  return (
    <SettingsContext.Provider value={{ offlineLocations, updateOfflineLocations }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
