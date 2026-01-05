import { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';
import FilterSidebar from '../components/filter/FilterSidebar';
import ProductQuickView from '../components/product/ProductQuickView';

const Shop = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid-4');
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'popularity',
    priceRange: 'all',
    selectedColors: [],
    selectedBrands: [],
  });

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by price range
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
        
        switch (filters.priceRange) {
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
    }

    // Filter by colors (if any selected)
    if (filters.selectedColors.length > 0) {
      filtered = filtered.filter(product => {
        // Check if product has any of the selected colors
        if (product.colors && product.colors.length > 0) {
          return filters.selectedColors.some(selectedColor => {
            // Convert color names to match product colors (simplified)
            return product.colors.some(color => true); // In real app, match actual colors
          });
        }
        return true;
      });
    }

    // Filter by brands (if any selected)
    if (filters.selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        filters.selectedBrands.includes(product.brand)
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'newness':
        filtered.reverse();
        break;
      case 'popularity':
      case 'rating':
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [filters]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      sortBy: 'popularity',
      priceRange: 'all',
      selectedColors: [],
      selectedBrands: [],
    });
  };

  const hasActiveFilters = filters.priceRange !== 'all' || 
    filters.selectedColors.length > 0 || 
    filters.selectedBrands.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <span>Home</span>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Shop</span>
      </nav>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Clear Filters */}
          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          )}

          {/* Active Filters Display */}
          {filters.priceRange !== 'all' && (
            <button 
              onClick={() => setFilters({...filters, priceRange: 'all'})}
              className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
            >
              <span>{filters.priceRange === '0-1200' ? '0.00 - 1,200 EE' : 
                     filters.priceRange === '1200-2400' ? '1,200 - 2,400 EE' :
                     filters.priceRange === '2400-3600' ? '2,400 - 3,600 EE' :
                     '3,600 EE +'}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Results count */}
          <span className="text-sm text-gray-600">
            {filteredProducts.length} products found
          </span>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Items per page */}
          <div className="flex items-center gap-2 text-sm">
            <span>Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>
          </div>

          {/* View Mode Icons */}
          <div className="flex items-center gap-1 border rounded p-1">
            {/* Grid 3 columns */}
            <button
              onClick={() => setViewMode('grid-3')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid-3' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="3 columns"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="6" height="6" rx="1" />
                <rect x="9" y="2" width="6" height="6" rx="1" />
                <rect x="16" y="2" width="6" height="6" rx="1" />
                <rect x="2" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
                <rect x="16" y="9" width="6" height="6" rx="1" />
              </svg>
            </button>

            {/* Grid 4 columns */}
            <button
              onClick={() => setViewMode('grid-4')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid-4' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="4 columns"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="4.5" height="4.5" rx="1" />
                <rect x="7.5" y="2" width="4.5" height="4.5" rx="1" />
                <rect x="13" y="2" width="4.5" height="4.5" rx="1" />
                <rect x="18.5" y="2" width="4.5" height="4.5" rx="1" />
                <rect x="2" y="7.5" width="4.5" height="4.5" rx="1" />
                <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" />
                <rect x="13" y="7.5" width="4.5" height="4.5" rx="1" />
                <rect x="18.5" y="7.5" width="4.5" height="4.5" rx="1" />
              </svg>
            </button>

            {/* Grid 5 columns */}
            <button
              onClick={() => setViewMode('grid-5')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid-5' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="5 columns"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="1" y="1" width="3.5" height="3.5" rx="0.5" />
                <rect x="5.5" y="1" width="3.5" height="3.5" rx="0.5" />
                <rect x="10" y="1" width="3.5" height="3.5" rx="0.5" />
                <rect x="14.5" y="1" width="3.5" height="3.5" rx="0.5" />
                <rect x="19" y="1" width="3.5" height="3.5" rx="0.5" />
                <rect x="1" y="5.5" width="3.5" height="3.5" rx="0.5" />
                <rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.5" />
                <rect x="10" y="5.5" width="3.5" height="3.5" rx="0.5" />
                <rect x="14.5" y="5.5" width="3.5" height="3.5" rx="0.5" />
                <rect x="19" y="5.5" width="3.5" height="3.5" rx="0.5" />
              </svg>
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded transition-colors ${
              showFilters ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-50 border-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`grid ${showFilters ? 'lg:grid-cols-4' : 'lg:grid-cols-1'} gap-8`}>
        {/* Sidebar */}
        {showFilters && (
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-1'}>
          {paginatedProducts.length > 0 ? (
            <>
              <ProductGrid 
                products={paginatedProducts} 
                viewMode={viewMode}
                onQuickView={setSelectedProduct}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ‹
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded transition-colors ${
                        currentPage === i + 1
                          ? 'bg-blue-500 text-white'
                          : 'border hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

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

export default Shop;
