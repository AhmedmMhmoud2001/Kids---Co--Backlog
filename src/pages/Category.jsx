import { useState, useMemo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

const Category = () => {
  const { category } = useParams();

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

  // ✅ Reset when category changes
  useEffect(() => {
    // setCurrentPage(1);
    // setSelectedProduct(null);
    // setShowFilters(false);

    // لو عايز كل كاتيجوري تبدأ بدون فلاتر، فك التعليق:
    // setFilters({
    //   sortBy: 'popularity',
    //   priceRange: 'all',
    //   selectedColors: [],
    //   selectedBrands: [],
    // });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);

  // Format category name for display
  const categoryName =
    category
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || 'Category';

  // Filter products by category and apply filters
  const filteredProducts = useMemo(() => {
    return applyFilters(products, filters, category);
  }, [category, filters]);

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

  const hasActiveFilters =
    filters.priceRange !== 'all' ||
    filters.selectedColors.length > 0 ||
    filters.selectedBrands.length > 0;

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleRemovePriceFilter = () => {
    setFilters({ ...filters, priceRange: 'all' });
    setCurrentPage(1);
  };

  return (
    <div className=" container mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="py-8 ">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: categoryName },
          ]}
        />

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
          categoryName={categoryName}
        />

        {/* Main Content */}
        <div className="relative">
          {/* Products Grid */}
          <div className={showFilters ? 'lg:mr-80' : ''}>
            {paginatedProducts.length > 0 ? (
              <>
                <ProductGrid
                  key={category} // ✅ important: force re-render on category change
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
                actionLabel="Clear filters"
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
      </div>
    </div>

  );
};

export default Category;
