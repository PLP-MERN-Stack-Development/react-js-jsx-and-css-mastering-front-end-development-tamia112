import { useState, useEffect, useCallback } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        // Key doesn't exist, use initial value
        return initialValue;
      }
      return JSON.parse(raw);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  // Remove item from localStorage
  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Function to update state (alternative to direct setState)
  const setValue = useCallback((value) => {
    setState(prev => {
      // Handle functional updates like setState
      const newValue = value instanceof Function ? value(prev) : value;
      return newValue;
    });
  }, []);

  return [state, setValue, remove];
}