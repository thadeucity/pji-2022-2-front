import { useRouter } from 'next/router';
import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import { AppMenu } from '../components/AppMenu/AppMenu';
import { GroupModal } from '../components/GroupModal/GroupModal';
import { useAppUser } from './user';

interface AppMenuContextData {
  isOpen: boolean;
  isGroupModalOpen: boolean;
  toggleMenu: (b?: boolean) => void;
  toggleGroupModal: (b?: boolean) => void;
}

const AppMenuContext = createContext<AppMenuContextData>({
  isOpen: false,
  toggleMenu: () => {},
  isGroupModalOpen: false,
  toggleGroupModal: () => {},
});

const AppMenuProvider: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const {groupName} = useAppUser();
  const { asPath } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const toggleMenu = useCallback((newVal?: boolean) => {
    setIsOpen(curr => newVal ?? !curr);
  }, []);


  const toggleGroupModal = useCallback((newVal?: boolean) => {
    setIsGroupModalOpen(curr => newVal ?? !curr);
  }, []);

  const onCloseMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onCloseGroupModal = useCallback((cascade?: boolean) => {
    setIsGroupModalOpen(false);
    if(cascade === true) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if(asPath) {
      setIsOpen(false);
      setIsGroupModalOpen(false);
    }	
  }, [asPath])

  return (
    <AppMenuContext.Provider value={{
      isOpen, 
      isGroupModalOpen, 
      toggleMenu, 
      toggleGroupModal
    }}>
      {children}
      <AppMenu 
        isOpen={isOpen} 
        onClose={onCloseMenu} 
        onOpenGroupModal={() => toggleGroupModal(true)}
      />
      <GroupModal 
        isOpen={isGroupModalOpen}
        onClose={onCloseGroupModal} 
        currentGroup={groupName}
      />
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