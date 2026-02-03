import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../components/common/Container";
import Breadcrumb from "../components/common/Breadcrumb";
import ProductGrid from "../components/product/ProductGrid";
import ProductToolbar from "../components/product/ProductToolbar";
import FilterSidebarWrapper from "../components/filter/FilterSidebarWrapper";
import ProductQuickView from "../components/product/ProductQuickView";
import Pagination from "../components/common/Pagination";
import EmptyState from "../components/common/EmptyState";
import Loading from "../components/common/Loading";
import { applyFilters } from "../utils/productFilters";
import { useProducts } from "../hooks/useProducts";
import { useApp } from "../context/AppContext";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const queryAudience = searchParams.get('audience');
  const search = searchParams.get('search');
  const { audience: contextAudience, setAudience } = useApp();

  // URL param takes priority over context
  const audience = queryAudience || contextAudience;

  // Sync URL audience with context (only when needed)
  useEffect(() => {
    if (queryAudience && queryAudience !== contextAudience) {
      setAudience(queryAudience);
    }
  }, [queryAudience, contextAudience, setAudience]);

  // ✅ استخدام React Query للـ caching - تلقائي مع auto-refetch
  const { 
    data: products = [], 
    isLoading, 
    isError,
    error,
    refetch 
  } = useProducts(
    { audience, search },
    {
      // Keep previous data while fetching new
      placeholderData: (previousData) => previousData,
    }
  );

  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid-4");
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filters, setFilters] = useState({
    sortBy: "popularity",
    priceRange: "all",
    selectedColors: [],
    selectedBrands: [],
  });

  // Reset page and close filters on audience/search change
  useEffect(() => {
    setCurrentPage(1);
    setShowFilters(false);
    window.scrollTo(0, 0);
  }, [audience, search]);

  // Lock body scroll when filters are open on mobile
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilters]);

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    return applyFilters(products, filters);
  }, [products, filters]);

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

  const clearFilters = useCallback(() => {
    setFilters({
      sortBy: "popularity",
      priceRange: "all",
      selectedColors: [],
      selectedBrands: [],
    });
    setCurrentPage(1);
  }, []);

  const hasActiveFilters =
    filters.priceRange !== "all" ||
    filters.selectedColors.length > 0 ||
    filters.selectedBrands.length > 0;

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleRemovePriceFilter = () => {
    setFilters({ ...filters, priceRange: "all" });
  };

  // Error state
  if (isError) {
    return (
      <Container className="py-5 sm:py-8 px-3 sm:px-6">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">
            حدث خطأ في تحميل المنتجات: {error?.message}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            حاول مرة أخرى
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5 sm:py-8 px-3 sm:px-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: audience === 'NEXT' ? 'Home 2' : 'Home', to: audience === 'NEXT' ? '/home2' : '/' },
          { label: "Shop" }
        ]}
      />

      {/* Toolbar */}
      <ProductToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((prev) => !prev)}
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
        {/* Overlay on mobile when filters are open */}
        {showFilters && (
          <button
            aria-label="Close filters overlay"
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => {
              setShowFilters(false);
              clearFilters();
            }}
          />
        )}

        {/* Products Grid */}
        <div className={showFilters ? "lg:mr-80" : ""}>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loading />
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <ProductGrid
                products={paginatedProducts}
                viewMode={viewMode}
                onQuickView={setSelectedProduct}
              />

              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No products found"
                description="Try adjusting your filters"
                actionLabel="Clear all filters"
                onAction={clearFilters}
              />
            </div>
          )}
        </div>

        {/* Filter Sidebar */}
        <div className="relative z-50">
          <FilterSidebarWrapper
            isOpen={showFilters}
            onClose={() => {
              setShowFilters(false);
              clearFilters();
            }}
            onFilterChange={handleFilterChange}
            filters={filters}
          />
        </div>
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
