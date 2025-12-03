import { CartCard } from './CartCard';
import { CartItem } from '../../data/types/types';

interface CartListProps {
  items: CartItem[];
  selectedItems: Set<string>;
  onToggleSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export function CartList({
  items,
  selectedItems,
  onToggleSelect,
  onRemove,
}: CartListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CartCard
          key={item.id}
          item={item}
          isSelected={selectedItems.has(item.id)}
          onToggleSelect={onToggleSelect}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
