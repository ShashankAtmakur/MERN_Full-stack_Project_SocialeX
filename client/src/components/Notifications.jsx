import React, { useContext } from 'react'
import '../styles/Notifications.css'
import {RxCross2} from 'react-icons/rx' 
import { GeneralContext } from '../context/GeneralContextProvider'

const Notifications = () => {

    const {socket, isNotificationsOpen, setNotificationsOpen, notifications, setNotifications} = useContext(GeneralContext);

    const handleClose = () => {
        setNotificationsOpen(false);
        const userId = localStorage.getItem('userId');
        if (userId) {
            socket.emit('mark-notifications-read', {userId});
            setNotifications((current) => current.map((notification) => ({...notification, read: true})));
        }
    };

  return (
    <>
        <div className="notificationsModalBg" style={isNotificationsOpen? {display: 'contents'} : {display: 'none'}} >
            <div className="notificationsContainer">
               
                <RxCross2 className='closenotifications' onClick={handleClose} />
                <h2 className="notificationsTitle">Notifications</h2>
                <hr className="notificationsHr" />
                
                <div className="notificationsBody">
                    {notifications.length === 0 ? <p>No new notifications</p> : notifications.slice().reverse().map((notification, index) => (
                        <div className={`notificationItem ${notification.read ? '' : 'unread'}`} key={`${notification.createdAt}-${index}`}>
                            <strong>{notification.message}</strong>
                            <small>{new Date(notification.createdAt).toLocaleString()}</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default Notifications;