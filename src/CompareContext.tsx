import { createContext, useContext, useState, ReactNode } from "react";

export interface Car {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CompareContextType {
  compareItems: Car[];
  addToCompare: (car: Car) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareItems, setCompareItems] = useState<Car[]>([]);

  const addToCompare = (car: Car) => {
    setCompareItems((prev) => {
      if (prev.find((c) => c.id === car.id)) return prev;
      if (prev.length >= 3) {
        alert("Chỉ được so sánh tối đa 3 xe");
        return prev;
      }
      return [...prev, car];
    });
  };

  const removeFromCompare = (id: number) => {
    setCompareItems((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCompare = () => setCompareItems([]);

  return (
    <CompareContext.Provider
      value={{ compareItems, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error("useCompare must be used inside CompareProvider");
  }
  return ctx;
};
