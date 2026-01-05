import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const categories = [
    { name: 'Boy', path: '/category/boy', color: 'blue' },
    { name: 'Girl', path: '/category/girl', color: 'pink' },
    { name: 'Baby Boy', path: '/category/baby-boy', color: 'blue' },
    { name: 'Baby Girl', path: '/category/baby-girl', color: 'pink' },
    { name: 'Accessories', path: '/category/accessories', color: 'blue' },
    { name: 'Footwear', path: '/category/footwear', color: 'pink' },
  ];

  const getColorClasses = (category, isActive) => {
    if (isActive) {
      if (category.color === 'blue') {
        return 'text-[#63adfc] border-b-2 border-[#63adfc]';
      } else {
        return 'text-[#ff92a5] border-b-2 border-[#ff92a5]';
      }
    }
    
    // Hover colors
    if (category.color === 'blue') {
      return 'text-gray-700 hover:text-[#63adfc] border-b-2 border-transparent hover:border-[#63adfc]';
    } else {
      return 'text-gray-700 hover:text-[#ff92a5] border-b-2 border-transparent hover:border-[#ff92a5]';
    }
  };

  return (
    <nav className=" bg-white border-t  sticky top-16 z-30 hidden lg:block">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        <ul className="flex items-center justify-center gap-8 py-4">
          {categories.map((category) => {
            const isActive = location.pathname === category.path;
            
            return (
              <li key={category.path}>
                <Link
                  to={category.path}
                  className={`font-medium transition-all duration-200 pb-1 whitespace-nowrap ${getColorClasses(category, isActive)}`}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
