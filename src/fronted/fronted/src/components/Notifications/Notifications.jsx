import React, { useEffect, useState } from 'react';
import axiosInstance from '../../service/notificationservice.js';
import { useSpring, animated } from 'react-spring';
import './Notifications.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState('unread'); // 'unread' o 'read'
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axiosInstance.get('/notifications/');
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Fetch notifications initially
        fetchNotifications();

        // Set up interval to fetch notifications every 5 seconds
        const interval = setInterval(fetchNotifications, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            const response = await axiosInstance.patch(`/notifications/${id}/mark-as-read/`);
            if (response.status === 200) {
                setNotifications((prev) =>
                    prev.map((notif) =>
                        notif.id === id ? { ...notif, is_read: true } : notif
                    )
                );
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            const unreadIds = notifications.filter((notif) => !notif.is_read).map((notif) => notif.id);
            await Promise.all(unreadIds.map((id) => axiosInstance.patch(`/notifications/${id}/mark-as-read/`)));
            setNotifications((prev) =>
                prev.map((notif) => ({ ...notif, is_read: true }))
            );
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const unreadNotifications = notifications.filter((notification) => !notification.is_read);
    const readNotifications = notifications.filter((notification) => notification.is_read);

    const flipAnimation = useSpring({
        transform: flip ? 'rotateY(180deg)' : 'rotateY(0deg)',
        config: { tension: 200, friction: 20 },
    });

    return (
        <div className="notifications-container">
            <h2 className="notifications-title">Notifications</h2>
            <div className="notifications-tabs">
                <button
                    className={`tab-button ${activeTab === 'unread' ? 'active' : ''}`}
                    onClick={() => {
                        setFlip((prev) => !prev);
                        setActiveTab('unread');
                    }}
                >
                    Unread ({unreadNotifications.length})
                </button>
                <button
                    className={`tab-button ${activeTab === 'read' ? 'active' : ''}`}
                    onClick={() => {
                        setFlip((prev) => !prev);
                        setActiveTab('read');
                    }}
                >
                    Read ({readNotifications.length})
                </button>
                {activeTab === 'unread' && unreadNotifications.length > 0 && (
                    <button className="mark-all-button" onClick={handleMarkAllAsRead}>
                        Mark All as Read
                    </button>
                )}
            </div>
            <div className="notifications-box">
                <animated.div style={flipAnimation} className="notifications-content">
                    {activeTab === 'unread' ? (
                        unreadNotifications.length > 0 ? (
                            unreadNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="notification-item unread"
                                    onClick={() => notification.url && window.open(notification.url, '_blank')}
                                    style={{ cursor: notification.url ? 'pointer' : 'default' }}
                                >
                                    <div className="notification-text">
                                        <p className="notification-description">
                                            {notification.description || 'No description available'}
                                        </p>
                                        <p className="notification-date">
                                            {new Date(notification.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        className="mark-as-read-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMarkAsRead(notification.id);
                                        }}
                                    >
                                        Mark as Read
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <h3>Oops!</h3>
                                <p>No unread notifications available.</p>
                            </div>
                        )
                    ) : (
                        readNotifications.length > 0 ? (
                            readNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="notification-item read"
                                    onClick={() => notification.url && window.open(notification.url, '_blank')}
                                    style={{ cursor: notification.url ? 'pointer' : 'default' }}
                                >
                                    <div className="notification-text">
                                        <p className="notification-description">
                                            {notification.description || 'No description available'}
                                        </p>
                                        <p className="notification-date">
                                            {new Date(notification.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <h3>Oops!</h3>
                                <p>No read notifications available.</p>
                            </div>
                        )
                    )}
                </animated.div>
            </div>
        </div>
    );
};

export default Notifications;
