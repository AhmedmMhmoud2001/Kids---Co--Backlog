import Section from '../common/Section';

/**
 * Brands section component
 */
const BrandsSection = ({ brands = [], className = '' }) => {
  const defaultBrands = [
    { name: 'River Island', className: 'text-lg sm:text-xl md:text-2xl font-light tracking-wider' },
    { name: 'GUCCI', className: 'text-xl sm:text-2xl md:text-3xl font-serif tracking-widest' },
    { name: 'TED BAKER', className: 'text-base sm:text-lg md:text-xl font-light tracking-wider' },
    { name: 'GOLDEN GOOSE', className: 'text-base sm:text-lg md:text-xl font-light tracking-wider' },
  ];

  const brandsToShow = brands.length > 0 ? brands : defaultBrands;

  return (
    <Section padding="py-4 sm:py-5 lg:py-6" className={`border-b ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center">
        {brandsToShow.map((brand, idx) => (
          <div key={idx} className="opacity-30 hover:opacity-60 transition-opacity">
            <span className={`text-gray-400 ${brand.className || defaultBrands[idx]?.className || ''}`}>
              {brand.name || brand}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default BrandsSection;

