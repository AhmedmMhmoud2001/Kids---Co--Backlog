import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products} from '../data/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Section from '../components/common/Section';
import BrandsSection from '../components/sections/BrandsSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import ProductQuickView from '../components/product/ProductQuickView';
import boy from '../assets/Ellipse1994.png';
import Girl from '../assets/Ellipse19941.png';
import BabyBoy from '../assets/Ellipse19942.png';
import BabyGirl from '../assets/Ellipse19943.png';
import Accessories from '../assets/Ellipse19944.png';
import Footwear from '../assets/Ellipse1995.png';

import 'swiper/css';
import 'swiper/css/pagination';

// Import images
import heroImage1 from '../assets/heroImage1.png';
import heroImage2 from '../assets/heroImage2.png';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
{
        name: 'Boy',
        image:boy,
        bgcolor: 'blue',
      },
      {
        name: 'Girl',
        image: Girl,
        bgcolor: 'pink',
      },
      {
        name: 'Baby Boy',
        image: BabyBoy,
        bgcolor: 'blue'
      },
      {
        name: 'Baby Girl',
        image: BabyGirl,
        bgcolor: 'pink'
      },
      {
        name: 'Accessories',
        image: Accessories,
       
      },
      {
        name: 'Footwear',
        image: Footwear,
       
      },
  ];
    
 

  
  // Hero slides
  const heroSlides = [
    { id: 1, leftImage: heroImage1, rightImage: heroImage2, title: 'Shop Smart', link: '/shop' },
    { id: 2, leftImage: heroImage1, rightImage: heroImage2, title: 'Shop Smart', link: '/shop' },
    { id: 3, leftImage: heroImage1, rightImage: heroImage2, title: 'Shop Smart', link: '/shop' },
  ];

  return (
    <div>
      {/* Hero Section - Swiper Slider */}
      <Section padding="py-4 lg:py-8" container={false}>
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
                  <div className="relative w-[130%] right-0 top-1/2 -translate-y-1/2 bg-gradient-to-b h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] from-blue-50 to-blue-100">
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
      </Section>

      {/* Brands Section */}
      <BrandsSection />

      {/* Categories Section */}
      <CategoriesSection categories={categories} />

      {/* Best Sellers Section */}
      <BestSellersSection 
        products={products}
        onProductSelect={setSelectedProduct}
      />

      {/* Features Section */}
      <FeaturesSection />

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
