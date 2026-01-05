import { Link } from 'react-router-dom';
import Section from '../common/Section';

/**
 * Categories section component
 */
const CategoriesSection = ({ 
  categories = [], 
  limit = null,
  gridCols = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  className = '' 
}) => {
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

  const categoriesToShow = limit ? categories.slice(0, limit) : categories;

  return (
    <Section padding="py-4 lg:py-5" className={className}>
      <div className={`grid ${gridCols} gap-4 lg:gap-6`}>
        {categoriesToShow.map((category, idx) => {
          const categoryPath = getCategoryPath(category.name);
          
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
              <h3 className="font-medium text-xs sm:text-sm md:text-base text-gray-800 group-hover:text-blue-500 transition-colors">
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

