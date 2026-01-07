import { useState, useEffect } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Notify parent component when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        sortBy,
        priceRange,
        selectedColors,
        selectedBrands,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, priceRange, selectedColors, selectedBrands]);

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Average rating' },
    { value: 'newness', label: 'Newness' },
    { value: 'price-low', label: 'Price low to high' },
    { value: 'price-high', label: 'Price high to low' },
  ];

  const priceRanges = [
    { value: 'all', label: 'All' },
    { value: '0-1200', label: '0.00 EE - 1,200 EE' },
    { value: '1200-2400', label: '1,200 EE - 2,400 EE' },
    { value: '2400-3600', label: '2,400 EE - 3,600 EE' },
    { value: '3600+', label: '3,600 EE +' },
  ];

  const colors = [
    { name: 'Black', count: 1, color: '#000000' },
    { name: 'Black Patent', count: 1, color: '#1a1a1a' },
    { name: 'Bone', count: 1, color: '#e3dac9' },
    { name: 'Bone Borg', count: 1, color: '#d4c4a8' },
    { name: 'Confetti Pink', count: 1, color: '#f5c6d5' },
    { name: 'Cream', count: 1, color: '#fffdd0' },
  ];

  const brands = [
    { name: 'Boss', count: 1 },
    { name: 'KENZO KIDS', count: 1 },
    { name: 'moschino', count: 1 },
    { name: 'River Island', count: 1 },
    { name: 'TED Baker', count: 1 },
    { name: 'THE MARC JACOBS', count: 1 },
  ];

  const toggleColor = (colorName) => {
    setSelectedColors(prev =>
      prev.includes(colorName)
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName]
    );
  };

  const toggleBrand = (brandName) => {
    setSelectedBrands(prev =>
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
  };

  return (
    <div className="w-full space-y-8">

      {/* Sort By */}
      <div>
        <h3 className="font-semibold mb-4">Sort by</h3>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`px-4 py-2 border rounded transition-colors ${sortBy === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <hr />

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-4">Price</h3>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setPriceRange(range.value)}
              className={`px-4 py-2 border rounded transition-colors ${priceRange === range.value
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <hr />

      {/* Color */}
      <div>
        <h3 className="font-semibold mb-4">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`px-3 py-2 border rounded flex items-center gap-2 transition-colors ${selectedColors.includes(color.name)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <div
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color.color }}
              />
              <span className="text-sm">
                {color.name} ({color.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      <hr />

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-4">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand.name}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm">
                {brand.name} ({brand.count})
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;

