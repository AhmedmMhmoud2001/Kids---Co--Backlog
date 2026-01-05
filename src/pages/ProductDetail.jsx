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
    <Container className="py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', to: '/' },
        { label: getCategoryDisplayName(), to: `/category/${getCategoryPath()}` },
        { label: product.name },
      ]} />

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-5 gap-2">
            {images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                  selectedImage === idx ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{product.name}</h1>
            <p className="text-3xl sm:text-4xl text-blue-500 font-semibold">{product.price}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description:</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-3">Color:</h3>
            <div className="flex gap-2">
              {product.colors?.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(idx)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === idx ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">Size:</h3>
            <div className="flex gap-2">
              {product.sizes?.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(idx)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === idx
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-16 text-center border-x py-3"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded transition-colors"
            >
              Add to cart
            </button>
          </div>

          {/* Product Meta */}
          <div className="pt-6 border-t space-y-2 text-sm">
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
          <div className="pt-4 border-t">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-sm">Share:</span>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <details className="border-t pt-4">
            <summary className="font-semibold cursor-pointer flex items-center justify-between">
              Additional Information
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 text-sm text-gray-600">
              <p>Material composition and care instructions will be displayed here.</p>
            </div>
          </details>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
