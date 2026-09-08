import React, { createContext, useReducer, useState } from 'react'
import socketIoClient from 'socket.io-client';
import { SOCKET_URL } from '../config';

export const GeneralContext = createContext();


const socket = socketIoClient(SOCKET_URL, { autoConnect: true });

export const GeneralContextProvider = ({children}) => {

    const [isCreatPostOpen, setIsCreatePostOpen] = useState(false);
    const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);


    const [chatFirends, setChatFriends] = useState([]);
   

    const INITIAL_STATE = {
    chatId: null,
      user: {},
  };

  const userId = localStorage.getItem('userId');

  const chatReducer = (state, action) => {
      switch (action.type) {
          case "CHANGE_USER":
              return {
                  user: action.payload,
                  chatId: userId > action.payload._id ? userId + action.payload._id : action.payload._id + userId
              }
          default:
              return state;
      }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    React.useEffect(() => {
        const currentUserId = localStorage.getItem('userId');
        if (!currentUserId) return undefined;

        const handleNotificationsFetched = ({notifications: fetchedNotifications}) => {
            setNotifications(fetchedNotifications || []);
        };
        const handleNotificationReceived = (notification) => {
            setNotifications((current) => [notification, ...current]);
        };

        socket.emit('register-user', currentUserId);
        socket.emit('fetch-notifications', {userId: currentUserId});
        socket.on('notifications-fetched', handleNotificationsFetched);
        socket.on('notification-received', handleNotificationReceived);

        return () => {
            socket.off('notifications-fetched', handleNotificationsFetched);
            socket.off('notification-received', handleNotificationReceived);
        };
    }, []);




    return (
        <GeneralContext.Provider value={{socket, isCreatPostOpen, setIsCreatePostOpen, isCreateStoryOpen, setIsCreateStoryOpen, isNotificationsOpen, setNotificationsOpen, notifications, setNotifications, chatFirends, setChatFriends, chatData:state, dispatch}}>{children}</GeneralContext.Provider>
  )
}
