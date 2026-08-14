const STORAGE_KEYS = [
  "budgetHQ_expenses",
  "budgetHQ_categories",
  "budgetHQ_income",
  "budgetHQ_bills",
  "budgetHQ_savings",
  "budgetHQ_budgets",
  "budgetHQ_settings",
];

export function exportBudgetHQ() {
  const backup = {};

  STORAGE_KEYS.forEach((key) => {
    const data = localStorage.getItem(key);

    if (data !== null) {
      backup[key] = JSON.parse(data);
    }
  });

  const file = new Blob(
    [JSON.stringify(backup, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(file);

  const link = document.createElement("a");

  link.href = url;
  link.download = `budget-hq-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function importBudgetHQ(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const backup = JSON.parse(
          event.target.result
        );

        STORAGE_KEYS.forEach((key) => {
          if (backup[key] !== undefined) {
            localStorage.setItem(
              key,
              JSON.stringify(backup[key])
            );
          }
        });

        resolve(true);
      } catch (error) {
        reject(
          new Error(
            "Invalid Budget HQ backup file."
          )
        );
      }
    };

    reader.onerror = () => {
      reject(
        new Error(
          "Unable to read the backup file."
        )
      );
    };

    reader.readAsText(file);
  });
}

export function clearBudgetHQData() {
  STORAGE_KEYS.forEach((key) => {
    localStorage.removeItem(key);
  });
}