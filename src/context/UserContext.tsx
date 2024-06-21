import React, { createContext, useState, ReactNode } from 'react';

interface UserContextProps {
  user_id: string;
  setUserId: (id: string) => void;
}

export const UserContext = createContext<UserContextProps>({
  user_id: '',
  setUserId: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user_id, setUserId] = useState('');

  return (
    <UserContext.Provider value={{ user_id, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};