import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import Section from '../components/common/Section';
import BrandsSection from '../components/sections/BrandsSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import FeaturesSection from '../components/sections/FeaturesSection';

// Import images
import heroImage from '../assets/Hero.png';

const Home2 = () => {
  return (
    <div>
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
      <BrandsSection />

      {/* Categories Section - Limited to 5 items */}
      <CategoriesSection 
        categories={categories} 
        limit={5}
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
      />

      {/* Best Sellers Section */}
      <BestSellersSection products={products} />

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
};

export default Home2;
