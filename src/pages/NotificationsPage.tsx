import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { NotificationList } from '../components/notifications/NotificationList';
import { mockNotifications } from '../data/mockData';
import { Notification } from '../data/types/types';
import { Bell, BellOff, CheckCheck, Trash2 } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.isRead)
    : notifications;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="h-8 w-8 text-destructive" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Notifications</h1>
                <p className="text-sm text-muted-foreground">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-border hover:bg-accent transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Mark all read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-border hover:bg-destructive/10 hover:text-destructive transition-colors"
                  title="Clear all"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Clear all</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                filter === 'all'
                  ? 'border-destructive text-destructive'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                filter === 'unread'
                  ? 'border-destructive text-destructive'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <NotificationList
            notifications={filteredNotifications}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BellOff className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
