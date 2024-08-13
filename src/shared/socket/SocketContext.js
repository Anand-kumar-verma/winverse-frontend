// SocketContext.js
import React, { createContext, useContext, useMemo } from 'react';
import io from 'socket.io-client';
import { domain } from '../../services/urls';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
 const socket =  useMemo(()=>io(domain),[])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};
