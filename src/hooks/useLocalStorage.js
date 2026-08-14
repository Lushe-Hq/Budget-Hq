import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue
        ? JSON.parse(savedValue)
        : initialValue;
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}