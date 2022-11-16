import React, {createContext, useContext, useState} from 'react';
import { GroupModal } from '../components/GroupModal/GroupModal';

interface GroupModalContextData {
  isOpen: boolean;
  toggleMenu: () => void;
}

const GroupModalContext = createContext<GroupModalContextData>({
  isOpen: false,
  toggleMenu: () => {},
});

const GroupModalProvider: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <GroupModalContext.Provider value={{isOpen, toggleMenu}}>
      {children}
      <GroupModal isOpen={isOpen} onClose={toggleMenu}/>
    </GroupModalContext.Provider>
  );
};

function useGroupModal(): GroupModalContextData {
  const context = useContext(GroupModalContext);

  if (!context) {
    throw new Error('useGroupModal must be used within an GroupModalProvider');
  }

  return context;
}

export {GroupModalProvider, useGroupModal};