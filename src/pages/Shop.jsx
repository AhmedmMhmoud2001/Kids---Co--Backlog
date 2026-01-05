import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import Container from '../components/common/Container';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import ProductToolbar from '../components/product/ProductToolbar';
import FilterSidebarWrapper from '../components/filter/FilterSidebarWrapper';
import ProductQuickView from '../components/product/ProductQuickView';
import Pagination from '../components/common/Pagination';
import EmptyState from '../components/common/EmptyState';
import { applyFilters } from '../utils/productFilters';

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
    return applyFilters(products, filters);
  }, [filters]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const clearFilters = () => {
    setFilters({
      sortBy: 'popularity',
      priceRange: 'all',
      selectedColors: [],
      selectedBrands: [],
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = filters.priceRange !== 'all' || 
    filters.selectedColors.length > 0 || 
    filters.selectedBrands.length > 0;

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleRemovePriceFilter = () => {
    setFilters({ ...filters, priceRange: 'all' });
  };

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', to: '/' },
        { label: 'Shop' },
      ]} />

      {/* Toolbar */}
      <ProductToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        filteredCount={filteredProducts.length}
        totalCount={products.length}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        filters={filters}
        onRemovePriceFilter={handleRemovePriceFilter}
      />

      {/* Main Content */}
      <div className="relative">
        {/* Products Grid */}
        <div className={showFilters ? 'lg:mr-80' : ''}>
          {paginatedProducts.length > 0 ? (
            <>
              <ProductGrid 
                products={paginatedProducts} 
                viewMode={viewMode}
                onQuickView={setSelectedProduct}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <EmptyState
              title="No products found"
              description="Try adjusting your filters"
              actionLabel="Clear all filters"
              onAction={clearFilters}
            />
          )}
        </div>

        {/* Filter Sidebar */}
        <FilterSidebarWrapper
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </Container>
  );
};

export default Shop;
