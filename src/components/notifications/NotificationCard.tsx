import { FileText, GraduationCap, Settings, Wrench, Check, Trash2 } from 'lucide-react';
import { Notification } from '../../data/types/types';
import { formatRelativeTime } from '../../utils/date';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const notificationIcons = {
  document: FileText,
  training: GraduationCap,
  system: Settings,
  service: Wrench,
};

const notificationColors = {
  document: 'text-blue-500 bg-blue-500/10',
  training: 'text-green-500 bg-green-500/10',
  system: 'text-orange-500 bg-orange-500/10',
  service: 'text-destructive bg-destructive/10',
};

export function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationCardProps) {
  const Icon = notificationIcons[notification.type];
  const colorClass = notificationColors[notification.type];

  return (
    <div
      className={`group relative flex items-start gap-4 p-4 rounded-lg border transition-all ${
        notification.isRead
          ? 'bg-card border-border hover:bg-accent'
          : 'bg-accent border-destructive/20 hover:bg-accent/80'
      }`}
    >
      {/* Unread Indicator */}
      {!notification.isRead && (
        <div className="absolute top-4 left-0 w-1 h-12 bg-destructive rounded-r" />
      )}

      {/* Icon */}
      <div className={`flex-shrink-0 p-2 rounded-full ${colorClass}`}>
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${notification.isRead ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatRelativeTime(notification.timestamp)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notification.isRead && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead(notification.id);
            }}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            title="Mark as read"
          >
            <Check className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(notification.id);
          }}
          className="p-2 rounded-md hover:bg-destructive/10 transition-colors"
          title="Delete"
        >
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    </div>
  );
}
