import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ProductQuickView = ({ product, onClose }) => {
  const { addToCart } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Use available images from the product
  const images = (product.images && product.images.length > 0)
    ? product.images.slice(0, 6)
    : (product.image ? [product.image] : []);

  const handleAddToCart = () => {
    const color = product.colors?.[selectedColor];
    const size = product.sizes?.[selectedSize];
    addToCart(product, quantity, size, color);
    // Optional: Show success message
    alert('Product added to cart!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      {/* Modal Container */}
      <div
        className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-4 p-10 max-h-[90vh] overflow-y-auto scrollbar-hide">
          {/* Left Side - Images */}
          <div className="flex gap-5 shrink-0 w-[600px]">
            {/* Thumbnails */}
            <div className="flex flex-col gap-5 w-[67px] shrink-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-[67/80] border overflow-hidden transition-colors ${selectedImage === idx ? 'border-[#999]' : 'border-[#f2f2f2]'
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 h-[600px] overflow-hidden">
              <Link to={`/product/${product.id}`} onClick={onClose}>
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                />
              </Link>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div
            className="flex flex-col gap-8 w-[468px] shrink-0"
          >
            {/* Product Name */}
            <div>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="text-[20px] font-semibold text-black leading-tight w-[80%] hover:text-blue-500 transition-colors"
              >
                {product.name}
              </Link>
              <div className="mt-2">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-sm text-blue-500 hover:underline"
                >
                  View full details
                </Link>
              </div>
            </div>

            {/* Price */}
            <div className="text-[24px] font-bold text-[#63adfc]">
              {typeof product.price === 'number' ? `${product.price.toFixed(2)} EGP` : product.price + ` EGP`}
            </div>



            {/* Color Selection */}
            {product.colors && (
              <div className="flex gap-4 items-center">
                <span className="text-[16px] font-semibold text-[#333]">Color:</span>
                <div className="flex gap-4">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-6 h-6 rounded-full border border-gray-200 transition-all ${selectedColor === idx ? 'ring-2 ring-offset-2 ring-[#63adfc]' : ''
                        }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && (
              <div className="flex gap-4 items-center">
                <span className="text-[16px] font-semibold text-[#333]">Size:</span>
                <div className="flex gap-2 flex-1">
                  {product.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(idx)}
                      className={`px-4 py-2 border transition-colors ${selectedSize === idx
                        ? 'border-[#63adfc] text-[#63adfc] font-medium'
                        : 'border-[#f2f2f2] text-[#999]'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex gap-6 items-center">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 border border-[#f2f2f2]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h8" />
                  </svg>
                </button>
                <span className="px-2 text-[16px] text-[#999] min-w-[30px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v8m-4-4h8" />
                  </svg>
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#63adfc] hover:bg-[#5299e3] text-white font-semibold text-[16px] px-10 py-2 h-10 transition-colors"
              >
                Add to cart
              </button>
            </div>
            {/* Description */}
            <div className="flex flex-col gap-2">
              <h3 className="text-[16px] font-semibold text-[#333]">
                Description:
              </h3>
              <p className="text-[16px] text-[#767676] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Divider */}
            <hr className="border-t border-[#f2f2f2]" />

            {/* Product Meta Info */}
            <div className="flex flex-col gap-4">
              {/* SKU */}
              <div className="flex gap-4 items-center text-[16px]">
                <span className="font-semibold text-[#333]">SKU:</span>
                <span className="text-[#767676]">{product.sku || 'IMS002644'}</span>
              </div>

              {/* Category */}
              <div className="flex gap-4 items-center text-[16px]">
                <span className="font-semibold text-[#333]">Category:</span>
                <span className="text-[#767676]">{product.categoryName}</span>
              </div>

              {/* Brand */}
              <div className="flex gap-4 items-center text-[16px]">
                <span className="font-semibold text-[#333]">Brand:</span>
                <span className="text-[#767676]">{product.brand || 'No Brand'}</span>
              </div>

              {/* Share */}
              <div className="flex gap-4 items-center">
                <span className="text-[16px] font-semibold text-[#333]">Share:</span>
                <div className="flex gap-4">
                  <button className="hover:opacity-70 transition-opacity">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button className="hover:opacity-70 transition-opacity">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button className="hover:opacity-70 transition-opacity">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-10 right-10 w-8 h-8 hover:opacity-70 transition-opacity"
          >
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 9l-6 6m0-6l6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
