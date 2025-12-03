import { Trash2, Download } from 'lucide-react';
import { CartItem } from '../../data/types/types';
import { getFileIcon } from '../../utils/fileIcons';
import { formatRelativeTime } from '../../utils/date';

interface CartCardProps {
  item: CartItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export function CartCard({
  item,
  isSelected,
  onToggleSelect,
  onRemove,
}: CartCardProps) {
  const FileIcon = getFileIcon(item.fileType);

  return (
    <div
      className={`group flex items-center gap-4 p-4 rounded-lg border transition-all ${
        isSelected
          ? 'bg-accent border-destructive'
          : 'bg-card border-border hover:bg-accent'
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(item.id)}
        className="h-4 w-4 cursor-pointer accent-destructive shrink-0"
      />

      {/* File Icon */}
      <div className="flex-shrink-0">
        <FileIcon className="h-6 w-6 text-destructive" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate">{item.filename}</h3>
        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
          <span>{item.serialNumber}</span>
          {item.fileSize && <span>{item.fileSize}</span>}
          <span className="capitalize">{item.category.replace('-', ' ')}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Added {formatRelativeTime(item.dateAdded)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            console.log('Download:', item.filename);
            alert(`Downloading: ${item.filename}`);
          }}
          className="p-2 rounded-md hover:bg-muted transition-colors"
          title="Download"
        >
          <Download className="h-5 w-5 text-muted-foreground hover:text-foreground" />
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 rounded-md hover:bg-destructive/10 transition-colors"
          title="Remove from cart"
        >
          <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
        </button>
      </div>
    </div>
  );
}
