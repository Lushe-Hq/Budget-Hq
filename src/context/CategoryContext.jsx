import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useLocalStorage(
    "budgetHQ_categories",
    [
      {
        id: 1,
        name: "Food",
        icon: "🍔",
      },
      {
        id: 2,
        name: "Fuel",
        icon: "⛽",
      },
      {
        id: 3,
        name: "Shopping",
        icon: "🛍️",
      },
      {
        id: 4,
        name: "Bills",
        icon: "🧾",
      },
    ]
  );

  function addCategory(category) {
    setCategories((prev) => [
      ...prev,
      {
        ...category,
        id: Date.now(),
      },
    ]);
  }

  function updateCategory(updatedCategory) {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === updatedCategory.id
          ? updatedCategory
          : category
      )
    );
  }

  function deleteCategory(id) {
    setCategories((prev) =>
      prev.filter((category) => category.id !== id)
    );
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoryContext);
}