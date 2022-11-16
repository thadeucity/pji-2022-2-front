import React, {createContext, useContext, useState} from 'react';
import { AppMenu } from '../components/AppMenu/AppMenu';

interface AppMenuContextData {
  isOpen: boolean;
  toggleMenu: () => void;
}

const AppMenuContext = createContext<AppMenuContextData>({
  isOpen: false,
  toggleMenu: () => {},
});

const AppMenuProvider: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AppMenuContext.Provider value={{isOpen, toggleMenu}}>
      {children}
      <AppMenu isOpen={isOpen} onClose={toggleMenu}/>
    </AppMenuContext.Provider>
  );
};

function useAppMenu(): AppMenuContextData {
  const context = useContext(AppMenuContext);

  if (!context) {
    throw new Error('useAppMenu must be used within an AppMenuProvider');
  }

  return context;
}

export {AppMenuProvider, useAppMenu};