const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const quantity = item.quantity || 1;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onQuantityChange?.(item.id, newQuantity);
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Remove Button */}
      <button
        onClick={() => onRemove?.(item.id)}
        className="text-gray-400 hover:text-gray-600"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l-6 6m0-6l6 6" />
        </svg>
      </button>

      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="font-medium text-sm mb-1">{item.name}</h3>
        <p className="text-blue-500 font-semibold">{item.price}</p>
      </div>

      {/* Quantity Controls - Hidden on Mobile Cart Sidebar */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center border rounded">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-3 py-1 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-4 py-1 border-x min-w-[50px] text-center">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-3 py-1 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

