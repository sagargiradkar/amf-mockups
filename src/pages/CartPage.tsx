import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { CartList } from '../components/cart/CartList'; // ✅ Fixed path
import { useCart } from '../../src/context/CartContext'; // ✅ Fixed path (contexts not context)
import { ShoppingCart, Download, Trash2, FileText } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, clearCart, totalItems } = useCart();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(item => item.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleDownloadSelected = () => {
    if (selectedItems.size === 0) {
      alert('Please select items to download');
      return;
    }
    const selectedDocuments = items.filter(item => selectedItems.has(item.id));
    console.log('Downloading:', selectedDocuments);
    alert(`Downloading ${selectedItems.size} document(s)`);
    setSelectedItems(new Set());
  };

  const handleRemoveSelected = () => {
    if (selectedItems.size === 0) {
      alert('Please select items to remove');
      return;
    }
    if (window.confirm(`Remove ${selectedItems.size} item(s) from cart?`)) {
      selectedItems.forEach(id => removeFromCart(id));
      setSelectedItems(new Set());
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
      setSelectedItems(new Set());
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-destructive" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Download Cart</h1>
                <p className="text-sm text-muted-foreground">
                  {totalItems} {totalItems === 1 ? 'document' : 'documents'} ready for download
                </p>
              </div>
            </div>

            {items.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-border hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Clear Cart</span>
                </button>
              </div>
            )}
          </div>

          {selectedItems.size > 0 && (
            <div className="flex items-center justify-between bg-muted border border-border rounded-lg p-4 mb-4">
              <span className="text-sm font-medium">
                {selectedItems.size} {selectedItems.size === 1 ? 'item' : 'items'} selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadSelected}
                  className="flex items-center gap-2 px-4 py-2 bg-destructive text-white text-sm font-semibold rounded-md hover:bg-destructive/90 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download Selected
                </button>
                <button
                  onClick={handleRemoveSelected}
                  className="flex items-center gap-2 px-4 py-2 border border-border text-sm font-medium rounded-md hover:bg-accent transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </div>
          )}

          {items.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={selectedItems.size === items.length && items.length > 0}
                onChange={toggleSelectAll}
                className="h-4 w-4 cursor-pointer accent-destructive"
              />
              <span className="text-sm font-medium">Select All</span>
            </div>
          )}
        </div>

        {items.length > 0 ? (
          <CartList
            items={items}
            selectedItems={selectedItems}
            onToggleSelect={toggleSelect}
            onRemove={removeFromCart}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add documents from the documentation page to download them later
            </p>
            <a
              href="/documentation"
              className="flex items-center gap-2 px-4 py-2 bg-destructive text-white font-semibold rounded-md hover:bg-destructive/90 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Browse Documents
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}
