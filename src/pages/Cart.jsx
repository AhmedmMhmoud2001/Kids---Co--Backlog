import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Cart = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useApp();
  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartQuantity(id, newQuantity);
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-3 sm:px-6 md:px-10 lg:px-20 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Cart</span>
      </nav>

      {cartItems.length === 0 ? (
        /* Empty Cart - Centered */
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* Table Header - Desktop only */}
          <div className="w-full max-w-5xl mb-8">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b font-semibold text-sm">
              <div className="col-span-1"></div>
              <div className="col-span-5">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Subtotal</div>
            </div>
          </div>

          {/* Empty Cart Message */}
          <div className="text-center py-12 text-gray-500">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-4">
              Start adding products to your cart!
            </p>
            <Link
              to="/shop"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg">
              {/* Table Header (Desktop only) */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b font-semibold text-sm">
                <div className="col-span-1"></div>
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Subtotal</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y">
                {cartItems.map((item) => {
                  const price = parseFloat(
                    item.price.replace(/[^0-9.]/g, "")
                  );
                  const itemSubtotal = price * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="
                        py-4
                        flex flex-col gap-3
                        md:grid md:grid-cols-12 md:gap-4 md:items-center md:py-6
                      "
                    >
                      {/* Row 1 (mobile): remove + product */}
                      <div className="flex items-start justify-between gap-3 md:contents">
                        {/* Remove Button */}
                        <div className="md:col-span-1 flex justify-end md:justify-start">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-gray-600"
                            aria-label="Remove item"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <circle cx="12" cy="12" r="10" strokeWidth={2} />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 9l-6 6m0-6l6 6"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Product Info */}
                        <div className="md:col-span-5 flex gap-3 sm:gap-4 flex-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                              {item.name}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Details (mobile stacked) + Desktop columns */}
                      <div className="grid grid-cols-2 gap-3 md:contents">
                        {/* Price */}
                        <div className="md:col-span-2">
                          <p className="text-xs text-gray-500 md:hidden">
                            Price
                          </p>
                          <span className="text-blue-500 font-medium">
                            {item.price}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-2">
                          <p className="text-xs text-gray-500 md:hidden">
                            Quantity
                          </p>
                          <div className="flex items-center border rounded w-fit">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 hover:bg-gray-100"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-x min-w-[50px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-span-2 md:col-span-2">
                          <p className="text-xs text-gray-500 md:hidden">
                            Subtotal
                          </p>
                          <span className="text-blue-500 font-semibold">
                            {itemSubtotal.toFixed(2)} EE
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:col-span-1 lg:sticky lg:top-6 h-fit">
            <div className="bg-gray-50 rounded-lg p-5 sm:p-6 space-y-6">
              <h2 className="text-lg sm:text-xl font-bold">Cart totals</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">{subtotal.toFixed(2)} EE</span>
                </div>

                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="text-blue-500 font-semibold">
                    {subtotal.toFixed(2)} EE
                  </span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="pt-4 border-t">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon Code"
                    className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-medium transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded text-center transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
