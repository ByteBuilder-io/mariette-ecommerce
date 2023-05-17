interface CounterProviderProps {
  children: React.ReactNode;
}

import React, { createContext, useContext, useState, useEffect } from "react";

interface CounterContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
  setCount: (count: number) => void;
}

const CounterContext = createContext<CounterContextType>({
  count: 0,
  increment: () => {},
  decrement: () => {},
  setCount: () => {},
});

export const useCounter = (): CounterContextType => useContext(CounterContext);

export const CounterProvider: React.FC<CounterProviderProps> = ({
  children,
}) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const updateCount = (newCount: number) => {
    setCount(newCount);
  };

  useEffect(() => {
    // Configuramos el valor inicial del contador después de que se monta el componente
    setCount(0);
  }, []);

  return (
    <CounterContext.Provider
      value={{ count, increment, decrement, setCount: updateCount }}
    >
      {children}
    </CounterContext.Provider>
  );
};
