import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  return (
    <LayoutContext.Provider value={{ showHeaderFooter, setShowHeaderFooter }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
