import { createContext, useState } from "react";

const NotificaionCtx = createContext({
    notification:null, // {title, message, status}
    showNotification:function(){},
    hideNotification:function(){},
});

export const NotificationProvider = (props) => {
    const [activeNotification, setActiveNotification] = useState();

    const showNotificationHandler = (notification) => {
        console.log(notification);
        setActiveNotification(notification);
    }

    const hideNotificationHander = () => {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHander,
    }

    return(
        <NotificaionCtx.Provider value={context}>
            {props.children}
        </NotificaionCtx.Provider>
    )
}

export default NotificaionCtx;