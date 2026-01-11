import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import Container from '../components/common/Container';
import Breadcrumb from '../components/common/Breadcrumb';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)) || products[0];
  const { addToCart } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Use product.images array if available, otherwise fallback to single image repeated
  const images = (product.images && product.images.length >= 6)
    ? product.images.slice(0, 6)
    : Array(6).fill(product.image);

  // Get category path for breadcrumb
  const getCategoryPath = () => {
    return product.category || 'shop';
  };

  // Get category display name
  const getCategoryDisplayName = () => {
    return product.categoryDisplay ||
      product.category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') || 'Shop';
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: Show success message or redirect
    alert('Product added to cart!');
  };

  return (
    <Container className="py-3 sm:py-4 md:py-6 lg:py-8">
      {/* Breadcrumb */}
      <div className="mb-3 sm:mb-4">
        <Breadcrumb items={[
          { label: 'Home', to: '/' },
          { label: getCategoryDisplayName(), to: `/category/${getCategoryPath()}` },
          { label: product.name },
        ]} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-8 lg:gap-12 max-w-full overflow-hidden">

        {/* Product Images */}
        <div className="w-full max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-5">
            {/* Main Image */}
            <div className="order-1 sm:order-2 w-full sm:flex-1 h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain bg-gray-50"
              />
            </div>

            {/* Thumbnails */}
            <div className="order-2 sm:order-1 flex sm:flex-col gap-1.5 sm:gap-2 w-full sm:w-[50px] md:w-[60px] shrink-0 overflow-x-auto sm:overflow-visible -mx-1 px-1 sm:mx-0 sm:px-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-[45px] h-[50px] sm:w-[50px] sm:h-[55px] md:w-[60px] md:h-[65px] border overflow-hidden transition-all rounded ${
                    selectedImage === idx 
                      ? 'border-blue-500 border-2 ring-1 ring-blue-300' 
                      : 'border-gray-300 hover:border-gray-400'
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
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-3 sm:space-y-4 md:space-y-5 w-full max-w-full">
          <div>
            <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2 md:mb-3 leading-tight break-words">{product.name}</h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-blue-500 font-semibold">{product.price}</p>
          </div>

          {/* Description */}
          <div className="w-full max-w-full">
            <h3 className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">Description:</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          <div className="w-full max-w-full">
            <h3 className="font-semibold text-sm sm:text-base mb-2">Color:</h3>
            <div className="flex gap-2 flex-wrap">
              {product.colors?.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 transition-all ${
                    selectedColor === idx 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="w-full max-w-full">
            <h3 className="font-semibold text-sm sm:text-base mb-2">Size:</h3>
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {product.sizes?.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(idx)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border rounded transition-all ${
                    selectedSize === idx
                      ? 'border-blue-500 bg-blue-50 text-blue-600 font-semibold'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 md:gap-4 w-full">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded w-full sm:w-auto shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 sm:px-4 py-2.5 hover:bg-gray-100 active:bg-gray-200 transition-colors text-lg font-medium"
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 sm:w-14 text-center border-x border-gray-300 py-2.5 text-sm sm:text-base font-medium"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 sm:px-4 py-2.5 hover:bg-gray-100 active:bg-gray-200 transition-colors text-lg font-medium"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:flex-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-2.5 px-4 text-sm sm:text-base transition-colors rounded"
            >
              Add to cart
            </button>
          </div>

          {/* Product Meta */}
          <div className="pt-4 sm:pt-6 border-t space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex gap-2">
              <span className="font-semibold">SKU:</span>
              <span className="text-gray-600">{product.sku || 'IMS002644'}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Category:</span>
              <span className="text-gray-600">{product.categoryDisplay || product.category}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Brand:</span>
              <span className="text-gray-600">{product.brand}</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="pt-3 sm:pt-4 border-t">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="font-semibold text-xs sm:text-sm">Share:</span>
              <div className="flex gap-1.5 sm:gap-2">
                <button className="p-1.5 sm:p-2 hover:bg-gray-100">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="p-1.5 sm:p-2 hover:bg-gray-100">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button className="p-1.5 sm:p-2 hover:bg-gray-100">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <details className="border-t pt-3 sm:pt-4">
            <summary className="font-semibold text-sm sm:text-base cursor-pointer flex items-center justify-between">
              Additional Information
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
              <p>Material composition and care instructions will be displayed here.</p>
            </div>
          </details>
        </div>
      </div>

    </Container>
  );
};

export default ProductDetail;
