import React, { createContext } from 'react';
import socketIoClient from 'socket.io-client';
import { SOCKET_URL } from '../config';


export const SocketContext = createContext();

const WS = SOCKET_URL;

const socket = socketIoClient(WS);

export const SocketContextProvider =  ({children}) => {

    return <SocketContext.Provider  value={{socket}} >{children}</SocketContext.Provider>
}

