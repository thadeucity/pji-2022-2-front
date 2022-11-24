import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0';
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../io/queryClient'

import { AppMenuProvider } from './useAppMenu'
import { GroupModalProvider } from './useGroupModal';
import { AppUserProvider } from './user';

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <AppUserProvider>
        <GroupModalProvider>
          <AppMenuProvider>
            {children}
          </AppMenuProvider>
        </GroupModalProvider>
      </AppUserProvider>
    </UserProvider>
  </QueryClientProvider>
)
