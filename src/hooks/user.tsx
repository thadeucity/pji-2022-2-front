import React, {createContext, use, useContext, useEffect, useState} from 'react';
import { whoIAm } from '../io/me';

interface AppUserContextData {
  groupId: string;
  isReady: boolean;
}

const AppUserContext = createContext<AppUserContextData>({
  groupId: '',
  isReady: false,
});

const AppUserProvider: React.FC<{children: React.ReactNode}> = ({
  children
}) => {
  const [isReady, setIsReady] = useState(false);
  const [groupId, setGroupId] = useState('');

  useEffect(() => {
    whoIAm().then(({res}) => {
      if(res) {
        console.log({res})
        setIsReady(true);
        setGroupId(res.groupId);
      }
    });	
  }, []);

  return (
    <AppUserContext.Provider value={{isReady, groupId}}>
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