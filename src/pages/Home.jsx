import { Link } from 'react-router-dom';
import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';
import ProductQuickView from '../components/product/ProductQuickView';
import ProductCard from '../components/product/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import images
import heroImage1 from '../assets/heroImage1.png';
import heroImage2 from '../assets/heroImage2.png';
import truckIcon from '../assets/truck-delivery.png';
import cardIcon from '../assets/card-tick.svg';
import deliveryIcon from '../assets/delivery-return-01.svg';
import supportIcon from '../assets/customer-support.svg';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Hero slides
  const heroSlides = [
    { id: 1, leftImage: heroImage1, rightImage: heroImage2, title: 'Shop Smart', link: '/shop' },
    { id: 2, leftImage: heroImage1, rightImage: heroImage2, title: 'Shop Smart', link: '/shop' },
    { id: 3, leftImage: heroImage1, rightImage: heroImage2, title: 'Shop Smart', link: '/shop' },
    
  ];

  return (
    <div className="">
      {/* Hero Section - Swiper Slider */}
      <section className="py-4 lg:py-8 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="rounded-xl overflow-hidden container mx-auto px-0 lg:px-20">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="hero-swiper"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                {/* Mobile - Single Image with Text */}
                <div className="block md:hidden relative h-[400px]">
                  <img
                    src={slide.rightImage}
                    alt="Kids Fashion"
                    className="w-full h-full object-cover opacity-25"
                    loading="eager"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-6">
                      <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                        <span className="block text-gray-900 mb-2">{slide.title}</span>
                        <span className="block">
                          <span className="text-gray-900">Shop </span>
                          <span className="text-black">Kids</span>
                          <span className="text-blue-500">&</span>
                          <span className="text-pink-500">Co</span>
                          <span className="text-black">.</span>
                        </span>
                      </h2>
                      <Link
                        to={slide.link}
                        className="inline-block text-black font-bold text-base border-b-3 border-black uppercase tracking-wider"
                      >
                        SHOP NOW
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Desktop - Side by Side */}
                <div className="hidden md:grid md:grid-cols-3 gap-0 relative">
                  {/* Left Image */}
                  <div className="relative w-[130%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-b from-pink-50 to-pink-100">
                    <img
                      src={slide.leftImage}
                      alt="Kids Fashion"
                      className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover object-top"
                      loading="eager"
                    />
                  </div>

                  {/* Right Image */}
                  <div className="relative  w-[130%] right-0 top-1/2 -translate-y-1/2 bg-gradient-to-b h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] from-blue-50 to-blue-100">
                    <div className='h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]'>
                      <img
                        src={slide.rightImage}
                        alt="Kids Fashion"
                        className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover object-center opacity-40"
                        loading="eager"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div>
                      <h2 className="text-1xl sm:text-1xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 leading-tight">
                        <span className="block text-gray-800">{slide.title}</span>
                        <span className="block">
                          <span className="text-gray-800">Shop </span>
                          <span className="text-black">Kids</span>
                          <span className="text-blue-500">&</span>
                          <span className="text-pink-500">Co</span>
                          <span className="text-black">.</span>
                        </span>
                      </h2>
                      <div className="mt-4 sm:mt-6 lg:mt-8">
                        <Link
                          to={slide.link}
                          className="inline-block bg-transparent text-black font-bold text-sm sm:text-base lg:text-lg py-2 px-0 border-b-2 sm:border-b-4 border-black hover:border-blue-500 transition-all uppercase tracking-wider"
                        >
                          SHOP NOW
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-4 sm:py-5 border-b px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
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
      <section className="py-4 lg:py-5 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, idx) => {
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
              <h3 className="font-medium text-xs sm:text-sm md:text-base text-gray-800 group-hover:text-blue-500 transition-colors">{category.name}</h3>
            </Link>
            );
          })}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-4 sm:py-5 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Best Sellers</h2>
          <Link to="/shop" className="text-blue-500 hover:text-blue-600 font-medium text-sm sm:text-base">
            More
          </Link>
        </div>

        {/* Product Carousel with Swiper */}
        <div className="relative best-sellers-swiper ">
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
      <section className="py-5 lg:py-12   px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {/* Fast Shipping */}
          <div className="text-center group">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <img src={truckIcon} alt="Fast Shipping" className="w-10 h-10 object-contain" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Shipping</h3>
            <p className="text-sm text-gray-600">Lightning-fast delivery, always on time</p>
          </div>

          {/* Instant Payment */}
          <div className="text-center group">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <img src={cardIcon} alt="Instant Payment" className="w-10 h-10 object-contain" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Payment</h3>
            <p className="text-sm text-gray-600">Secure, seamless, and instant transactions</p>
          </div>

          {/* Exchange & Return */}
          <div className="text-center group">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <img src={deliveryIcon} alt="Exchange & Return" className="w-10 h-10 object-contain" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Exchange & Return</h3>
            <p className="text-sm text-gray-600">Hassle-free returns, easy exchanges</p>
          </div>

          {/* Customer Service */}
          <div className="text-center group">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <img src={supportIcon} alt="Customer Service" className="w-10 h-10 object-contain" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Customer Service</h3>
            <p className="text-sm text-gray-600">We're always here to help with anything</p>
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

export default Home;

