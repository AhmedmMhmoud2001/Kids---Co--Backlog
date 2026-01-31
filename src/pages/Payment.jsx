import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems } = useApp();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let formattedValue = value;

    // Format card number (add spaces every 4 digits)
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      formattedValue = formattedValue.slice(0, 19); // Limit to 16 digits + 3 spaces
    }

    // Format expiry date (MM/YY)
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      formattedValue = formattedValue.slice(0, 5);
    }

    // Format CVV (3 digits)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Card number validation (16 digits)
    const cardNum = paymentData.cardNumber.replace(/\s/g, '');
    if (cardNum.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    // Card name validation
    if (!paymentData.cardName.trim()) {
      newErrors.cardName = 'Card holder name is required';
    }

    // Expiry date validation
    if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }

    // CVV validation
    if (paymentData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + price * item.quantity;
  }, 0);

  const shipping = 150;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would process the payment
      console.log('Processing payment:', paymentData);
      alert('Payment successful! Your order has been placed.');
      navigate('/account');
    }
  };

  const getCardType = (number) => {
    const firstDigit = number.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'American Express';
    return '';
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">›</span>
        <Link to="/cart" className="hover:text-gray-900">Cart</Link>
        <span className="mx-2">›</span>
        <Link to="/checkout" className="hover:text-gray-900">Checkout</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Payment</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Payment</h1>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Card Payment</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Card Number */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Card Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="1234 5678 9012 3456"
                  />
                  {getCardType(paymentData.cardNumber) && (
                    <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-semibold text-gray-600">
                      {getCardType(paymentData.cardNumber)}
                    </div>
                  )}
                </div>
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                )}
              </div>

              {/* Card Holder Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Card Holder Name *
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="JOHN DOE"
                  style={{ textTransform: 'uppercase' }}
                />
                {errors.cardName && (
                  <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                )}
              </div>

              {/* Expiry Date & CVV */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="MM/YY"
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                    CVV *
                  </label>
                  <input
                    type="password"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvv ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="123"
                    maxLength={3}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>

              {/* Save Card */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={paymentData.saveCard}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Save card for future purchases
                  </span>
                </label>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 p-3 sm:p-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-blue-900 mb-0.5 sm:mb-1">Secure Payment</p>
                    <p className="text-blue-700 leading-relaxed">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Accepted Cards */}
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">We accept:</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="border-2 border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-gray-600">
                    VISA
                  </div>
                  <div className="border-2 border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-gray-600">
                    MASTERCARD
                  </div>
                  <div className="border-2 border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-gray-600">
                    AMEX
                  </div>
                  <div className="border-2 border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold text-gray-600">
                    DISCOVER
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Link
                  to="/checkout"
                  className="w-full sm:flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 text-sm sm:text-base text-center hover:bg-gray-50 transition-colors"
                >
                  Back to Checkout
                </Link>
                <button
                  type="submit"
                  className="w-full sm:flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 text-sm sm:text-base transition-colors"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md p-4 sm:p-5 md:p-6 lg:sticky lg:top-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 md:mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5 md:mb-6 max-h-56 sm:max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 sm:gap-4">
                  <img
                    src={item.image || null}
                    alt={item.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium line-clamp-2">{item.name}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">Qty: {item.quantity}</p>
                    <p className="text-xs sm:text-sm font-semibold text-blue-500 mt-0.5">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-3 sm:my-4" />

            {/* Totals */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {cartItems.reduce((total, item) => {
                    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                    return total + price * item.quantity;
                  }, 0).toFixed(2)} EGP
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">150.00 EGP</span>
              </div>
              <hr />
              <div className="flex justify-between text-base sm:text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-500">
                  {(cartItems.reduce((total, item) => {
                    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                    return total + price * item.quantity;
                  }, 0) + 150).toFixed(2)} EGP
                </span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t">
              <p className="text-xs text-gray-500 text-center mb-2 sm:mb-3">Secure payment by:</p>
              <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                <div className="bg-gray-100 px-2.5 sm:px-3 py-1 text-xs font-semibold text-gray-600">
                  SSL
                </div>
                <div className="bg-gray-100 px-2.5 sm:px-3 py-1 text-xs font-semibold text-gray-600">
                  PCI DSS
                </div>
                <div className="bg-gray-100 px-2.5 sm:px-3 py-1 text-xs font-semibold text-gray-600">
                  3D Secure
                </div>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="mt-4 sm:mt-5 md:mt-6 flex items-center justify-center gap-2 sm:gap-3 text-xs text-gray-600">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>100% Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

