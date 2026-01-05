/**
 * Utility functions for product filtering and sorting
 */

/**
 * Filter products by price range
 */
export const filterByPriceRange = (products, priceRange) => {
  if (priceRange === 'all') return products;

  return products.filter(product => {
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    
    switch (priceRange) {
      case '0-1200':
        return price >= 0 && price <= 1200;
      case '1200-2400':
        return price > 1200 && price <= 2400;
      case '2400-3600':
        return price > 2400 && price <= 3600;
      case '3600+':
        return price > 3600;
      default:
        return true;
    }
  });
};

/**
 * Filter products by brands
 */
export const filterByBrands = (products, selectedBrands) => {
  if (selectedBrands.length === 0) return products;
  
  return products.filter(product => 
    selectedBrands.includes(product.brand)
  );
};

/**
 * Filter products by colors
 */
export const filterByColors = (products, selectedColors) => {
  if (selectedColors.length === 0) return products;
  
  return products.filter(product => {
    if (product.colors && product.colors.length > 0) {
      return selectedColors.some(() => true); // Simplified - in real app, match actual colors
    }
    return true;
  });
};

/**
 * Filter products by category
 */
export const filterByCategory = (products, category) => {
  if (!category) return products;
  
  return products.filter(product => {
    const productCategory = product.category.toLowerCase();
    const normalizedProductCategory = productCategory.replace(/\s+/g, '-');
    return normalizedProductCategory === category;
  });
};

/**
 * Sort products
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return priceA - priceB;
      });
      break;
    case 'price-high':
      sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return priceB - priceA;
      });
      break;
    case 'newness':
      sorted.reverse();
      break;
    case 'popularity':
    case 'rating':
    default:
      // Keep original order
      break;
  }
  
  return sorted;
};

/**
 * Apply all filters and sorting to products
 */
export const applyFilters = (products, filters, category = null) => {
  let filtered = category 
    ? filterByCategory(products, category)
    : [...products];
  
  filtered = filterByPriceRange(filtered, filters.priceRange);
  filtered = filterByBrands(filtered, filters.selectedBrands);
  filtered = filterByColors(filtered, filters.selectedColors);
  filtered = sortProducts(filtered, filters.sortBy);
  
  return filtered;
};

/**
 * Get price range display text
 */
export const getPriceRangeText = (priceRange) => {
  const rangeMap = {
    '0-1200': '0.00 - 1,200 EE',
    '1200-2400': '1,200 - 2,400 EE',
    '2400-3600': '2,400 - 3,600 EE',
    '3600+': '3,600 EE +',
  };
  return rangeMap[priceRange] || priceRange;
};

