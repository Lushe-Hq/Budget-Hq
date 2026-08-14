import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage(
    "budgetHQ_settings",
    {
      currency: "XCD",
      firstDayOfWeek: "Monday",
      budgetAlerts: true,
    }
  );

  function updateSetting(name, value) {
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetSettings() {
    setSettings({
      currency: "XCD",
      firstDayOfWeek: "Monday",
      budgetAlerts: true,
    });
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}