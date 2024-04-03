import { createContext, useContext, useState } from "react";
const Context = createContext();

export function MenuItemsStateTracker({ children }) {
  const [activeElement, setActiveElement] = useState("");
  return (
    <Context.Provider value={[activeElement, setActiveElement]}>
      {children}
    </Context.Provider>
  );
}

export function useMenuItemsStateTracker() {
  return useContext(Context);
}
