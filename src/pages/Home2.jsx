import { Link } from 'react-router-dom';
import { products } from '../data/products';
import Section from '../components/common/Section';
import BrandsSection from '../components/sections/BrandsSection';
import CategoriesSection from '../components/sections/CategoriesSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import boy from '../assets/Rectangle 5.png';
import Girl from '../assets/Rectangle 5 (1).png';
import BabyBoy from '../assets/Rectangle 4 (2).png';
import BabyGirl from '../assets/Rectangle 4 (3).png';
import Footwear from '../assets/Rectangle 4 (1).png';
import CategoriesSectionHome2 from '../components/sections/CategoriesSectionHome2';

const categories = [
  {
    name: 'Boy',
    image: boy,
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
    name: 'Footwear',
    image: Footwear,

  },
];

const Home2 = () => {
  return (
    <div>
      {/* Hero Section - Full Width with Overlay Text */}
      <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <video
            src="https://www.pexels.com/download/video/3917742/"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 md:px-10 lg:px-20 max-w-4xl">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Trusted By Parents Loved By Kids
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto px-4">
              Our Products Combine High Quality And Reliability, Making Them The Top Choice For Families.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <CategoriesSectionHome2 categories={categories} />

      {/* Categories Section - Limited to 5 items */}
      {/* <CategoriesSection 
        categories={categories} 
        limit={5}
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
      /> */}

      {/* Best Sellers Section */}
      <BestSellersSection products={products} />

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
};

export default Home2;
