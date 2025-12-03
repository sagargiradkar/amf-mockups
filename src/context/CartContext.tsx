import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Document } from '../data/types/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (document: Document) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (documentId: string) => boolean;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  const addToCart = (document: Document) => {
    setItems(prev => {
      if (prev.some(item => item.documentId === document.id)) {
        console.log('Document already in cart');
        return prev;
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          documentId: document.id,
          filename: document.filename,
          serialNumber: document.serialNumber,
          machineId: document.machineId,
          fileType: document.fileType,
          fileSize: document.fileSize,
          dateAdded: new Date().toISOString(),
          category: document.category,
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (documentId: string) => {
    return items.some(item => item.documentId === documentId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalItems: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
