import { useSettings } from "../context/SettingsContext";
import { formatCurrency } from "../utils/currency";

export function useCurrency() {
  const { settings } = useSettings();

  function currency(amount) {
    return formatCurrency(
      amount,
      settings.currency
    );
  }

  return { currency };
}