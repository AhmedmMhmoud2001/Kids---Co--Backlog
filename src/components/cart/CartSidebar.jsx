import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const CartSidebar = ({ isOpen, onClose, items }) => {
  const subtotal = items.reduce((total, item) => {
    // Extract numeric value from price string (e.g., "3,650.00 EE" -> 3650)
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + (price * (item.quantity || 1));
  }, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold">Subtotal</span>
              <span className="text-blue-500 font-semibold">
                {subtotal.toFixed(2)} EE
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 rounded text-center transition-colors"
              >
                View cart
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded text-center transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

