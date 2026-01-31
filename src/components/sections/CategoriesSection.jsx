import { Link } from 'react-router-dom';
import Section from '../common/Section';
import { useApp } from '../../context/AppContext';

/**
 * Categories section component
 */
const CategoriesSection = ({
  categories = [],
  limit = null,
  gridCols = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  className = ''
}) => {
  const { audience } = useApp();

  // Map category names to URL paths
  const getCategoryPath = (categoryName) => {
    const categoryPathMap = {
      'Boy': 'boy',
      'Girl': 'girl',
      'Baby Boy': 'baby-boy',
      'Baby Girl': 'baby-girl',
      'Accessories': 'accessories',
      'Footwear': 'footwear',
    };
    return categoryPathMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
  };
  const getCategoryClasses = (category) => {
    if (category.bgcolor === "blue") {
      return "text-gray-700 hover:text-[#63adfc] bg-gray-100 hover:bg-blue-200 transition-colors duration-700 ease-in-out ";
    } else if (category.bgcolor === "pink") {
      return "text-gray-700 hover:text-[#ff92a5] bg-gray-100 hover:bg-[#f1a6b3] transition-colors duration-700 ease-in-out border-b-2 border-transparent hover:border-[#ff92a5]";
    }
    return "relative overflow-hidden text-gray-700 hover:text-[#ff92a5] bg-gray-100  border-b-2 border-transparent hover:border-[#ff92a5] before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-200 before:to-[#f1a6b3] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700 before:ease-in-out before:z-0 ";
  };


  const categoriesToShow = limit ? categories.slice(0, limit) : categories;

  return (
    <Section padding="py-4 lg:py-5" className={className}>
      <div className={`grid ${gridCols} gap-4 lg:gap-6`}>
        {categoriesToShow.map((category, idx) => {
          const categoryPath = getCategoryPath(category.name);

          return (
            <Link
              key={idx}
              to={`/category/${category.slug || categoryPath}?audience=${audience}`}
              className={`group text-center hover:text-gray-500 }`}
            >
              <div className={`aspect-square  rounded-full overflow-hidden mb-3  shadow-md ${getCategoryClasses(category)}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="relative w-full h-full object-cover object-center z-10"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('bg-gray-300');
                  }}
                />
              </div>
              <h3 className={`font-medium text-xs sm:text-sm md:text-base transition-colors  `}>
                {category.name}
              </h3>
            </Link>
          );
        })}
      </div>
    </Section>
  );
};

export default CategoriesSection;

