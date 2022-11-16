import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0';

import { AppMenuProvider } from './useAppMenu'
import { GroupModalProvider } from './useGroupModal';

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <UserProvider>
    <GroupModalProvider>
      <AppMenuProvider>
        {children}
      </AppMenuProvider>
    </GroupModalProvider>
  </UserProvider>
)
