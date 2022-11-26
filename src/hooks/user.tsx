import React, {createContext, use, useCallback, useContext, useEffect, useState} from 'react';
import { whoIAm } from '../io/me';

interface AppUserContextData {
  groupId: string;
  isReady: boolean;
  groupName: string;
  refreshUser: () => void;
}

const AppUserContext = createContext<AppUserContextData>({
  groupId: '',
  groupName: '',
  isReady: false,
  refreshUser: () => null,
});

const AppUserProvider: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const [isReady, setIsReady] = useState(false);
  const [groupId, setGroupId] = useState('');
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    whoIAm().then(({res}) => {
      if(res) {
        setIsReady(true);
        setGroupId(res.groupId);
        setGroupName(res.groupName);
      }
    });	
  }, []);

  const refreshUser = useCallback(() => {
    whoIAm().then(({res}) => {
      if(res) {
        setIsReady(true);
        setGroupId(res.groupId);
        setGroupName(res.groupName);
      }
    });	
  }, [])

  return (
    <AppUserContext.Provider value={{isReady, groupId, groupName, refreshUser}}>
      {children}
    </AppUserContext.Provider>
  );
};

function useAppUser(): AppUserContextData {
  const context = useContext(AppUserContext);

  if (!context) {
    throw new Error('useAppUser must be used within an AppUserProvider');
  }

  return context;
}

export {AppUserProvider, useAppUser};