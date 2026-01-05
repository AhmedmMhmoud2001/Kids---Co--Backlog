import { Link } from 'react-router-dom';
import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import ProductQuickView from '../components/product/ProductQuickView';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import images
import heroImage from '../assets/Hero.png';
import truckIcon from '../assets/truck-delivery.png';
import cardIcon from '../assets/card-tick.svg';
import deliveryIcon from '../assets/delivery-return-01.svg';
import supportIcon from '../assets/customer-support.svg';

const Home2 = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="">
      {/* Hero Section - Full Width with Overlay Text */}
      <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Kids Fashion"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 md:px-10 lg:px-20 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Trusted By Parents Loved By Kids
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto px-4">
              Our Products Combine High Quality And Reliability, Making Them The Top Choice For Families.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-6 sm:py-8 lg:py-12 border-b px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
          {/* River Island */}
          <div className="opacity-30 hover:opacity-60 transition-opacity">
            <span className="text-lg sm:text-xl md:text-2xl font-light tracking-wider text-gray-400">River Island</span>
          </div>
          
          {/* GUCCI */}
          <div className="opacity-30 hover:opacity-60 transition-opacity">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif tracking-widest text-gray-400">GUCCI</span>
          </div>
          
          {/* TED BAKER */}
          <div className="opacity-30 hover:opacity-60 transition-opacity">
            <span className="text-base sm:text-lg md:text-xl font-light tracking-wider text-gray-400">TED BAKER</span>
          </div>
          
          {/* GOLDEN GOOSE */}
          <div className="opacity-30 hover:opacity-60 transition-opacity">
            <span className="text-base sm:text-lg md:text-xl font-light tracking-wider text-gray-400">GOLDEN GOOSE</span>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {categories.slice(0, 5).map((category, idx) => {
            // Map category names to correct paths
            const categoryPathMap = {
              'Boy': 'boy',
              'Girl': 'girl',
              'Baby Boy': 'baby-boy',
              'Baby Girl': 'baby-girl',
              'Accessories': 'accessories',
              'Footwear': 'footwear',
            };
            const categoryPath = categoryPathMap[category.name] || category.name.toLowerCase().replace(/\s+/g, '-');
            
            return (
            <Link
              key={idx}
              to={`/category/${categoryPath}`}
              className="group text-center"
            >
              <div className="aspect-square bg-gray-100 rounded-full overflow-hidden mb-3 group-hover:scale-105 transition-transform shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('bg-gray-300');
                  }}
                />
              </div>
              <h3 className="font-medium text-sm sm:text-base text-gray-800 group-hover:text-blue-500 transition-colors">
                {category.name}
              </h3>
            </Link>
            );
          })}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Best Sellers</h2>
          <Link to="/shop" className="text-blue-500 hover:text-blue-600 font-medium text-sm sm:text-base">
            More
          </Link>
        </div>

        {/* Product Carousel with Swiper */}
        <div className="relative best-sellers-swiper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            className="!pb-14"
          >
            {products.slice(0, 10).map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} onQuickView={setSelectedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Fast Shipping */}
          <div className="text-center group">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <img src={truckIcon} alt="Fast Shipping" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain" />
              </div>
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">Fast Shipping</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Lightning-fast delivery, always on time</p>
          </div>

          {/* Instant Payment */}
          <div className="text-center group">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <img src={cardIcon} alt="Instant Payment" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain" />
              </div>
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">Instant Payment</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Secure, seamless, and instant transactions</p>
          </div>

          {/* Exchange & Return */}
          <div className="text-center group">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <img src={deliveryIcon} alt="Exchange & Return" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain" />
              </div>
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">Exchange & Return</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Hassle-free returns, easy exchanges</p>
          </div>

          {/* Customer Service */}
          <div className="text-center group">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <img src={supportIcon} alt="Customer Service" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain" />
              </div>
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">Customer Service</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">We're always here to help with anything</p>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Home2;

