import { useState, useMemo, useCallback, useEffect } from "react";
import { products } from "../data/products";
import Container from "../components/common/Container";
import Breadcrumb from "../components/common/Breadcrumb";
import ProductGrid from "../components/product/ProductGrid";
import ProductToolbar from "../components/product/ProductToolbar";
import FilterSidebarWrapper from "../components/filter/FilterSidebarWrapper";
import ProductQuickView from "../components/product/ProductQuickView";
import Pagination from "../components/common/Pagination";
import EmptyState from "../components/common/EmptyState";
import { applyFilters } from "../utils/productFilters";

const Shop = () => {
  const [showFilters, setShowFilters] = useState(false);

  // ✅ خلي default مناسب للموبايل (لو ProductGrid بيترجمها)
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

  // ✅ اقفل سكرول الصفحة لما الفلاتر مفتوحة على الموبايل (Overlay)
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
      sortBy: "popularity",
      priceRange: "all",
      selectedColors: [],
      selectedBrands: [],
    });
    setCurrentPage(1);
  };

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

  return (
    <Container className="py-5 sm:py-8 px-3 sm:px-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: "Home", to: "/" }, { label: "Shop" }]}
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
        {/* ✅ Overlay على الموبايل لما الفلاتر مفتوحة */}
        {showFilters && (
          <button
            aria-label="Close filters overlay"
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Products Grid */}
        <div className={showFilters ? "lg:mr-80" : ""}>
          {paginatedProducts.length > 0 ? (
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

        {/* ✅ Sidebar: على الموبايل يبقى fixed overlay (ده غالبًا جوه FilterSidebarWrapper)
            بس احنا كمان بنخليه ياخد z-index أعلى من overlay */}
        <div className="relative z-50">
          <FilterSidebarWrapper
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            onFilterChange={handleFilterChange}
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
