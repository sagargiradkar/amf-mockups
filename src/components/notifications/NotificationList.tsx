import { NotificationCard } from './NotificationCard';
import { Notification } from '../../data/types/types';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationList({
  notifications,
  onMarkAsRead,
  onDelete,
}: NotificationListProps) {
  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
