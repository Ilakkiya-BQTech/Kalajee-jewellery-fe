import React from 'react';
import '../../Styles/notification.css';
import { Para, Subtitle, Title } from '../../Container/Container';

const notifications = [
  {
    id: 1,
    title: 'Gold Sold',
    message: '20 grams of gold sold today.',
    time: '5 mins ago',
  },
  {
    id: 2,
    title: 'New Arrival',
    message: 'New gold stone earrings added to the collection.',
    time: '10 mins ago',
  },
  {
    id: 3,
    title: 'Current Stock',
    message: '100 grams of gold available in stock.',
    time: '15 mins ago',
  },
];

function Notifications() {
  return (
    <div className="notifications-container">
        <Title text="Messages"/>
      <ul className="notifications-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <Subtitle text={notification.title}/>
            <Para text={notification.message} />
            <p className="notification-message"></p>
            <span className="notification-time">{notification.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
