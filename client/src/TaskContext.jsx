import React, { createContext, useEffect, useState } from "react";

export const taskContext = createContext();

export const ContextProvider = ({ children }) => {
  const [taskgets, setTaskgets] = useState(false);
  return (
    <>
      <taskContext.Provider value={{ taskgets, setTaskgets }}>
        {children}
      </taskContext.Provider>
    </>
  );
};
