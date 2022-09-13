import { Fragment, useContext } from 'react';
import NotificaionCtx from '../../store/notifincation-context';
import MainHeader from './main-header';
import Notification from '../../components/ui/notification';

function Layout(props) {
  console.log("layout");
  const notificationCtx = useContext(NotificaionCtx);

  const notification = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {console.log(notification)}
      {notification && <Notification title={notification.title} message={notification.message} status={notification.status}/>}
    </Fragment>
  );
}

export default Layout;
