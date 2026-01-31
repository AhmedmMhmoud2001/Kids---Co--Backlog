import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import ProductQuickView from '../product/ProductQuickView';
import { useApp } from '../../context/AppContext';
import { fetchProducts } from '../../api/products';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { audience } = useApp();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fetch search results from backend
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetchProducts({
          search: searchQuery,
          audience: audience
        });

        if (res.success && Array.isArray(res.data)) {
          setSearchResults(res.data.slice(0, 8)); // Limit to 8 results
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // Debounce API calls

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, audience]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}&audience=${audience}`);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <div
          className="bg-white shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 hover:bg-gray-100 transition-colors z-10"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Search Input */}
          <div className="p-6 border-b pt-10">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search for products"
                  className="w-full px-4 py-3 border border-gray-300 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500">Searching for products...</p>
              </div>
            ) : searchQuery.trim() ? (
              searchResults.length > 0 ? (
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {searchResults.map((product) => (
                      <div key={product.id} className="border p-4 hover:shadow-md transition-shadow">
                        <ProductCard
                          product={product}
                          onQuickView={setSelectedProduct}
                        />
                      </div>
                    ))}
                  </div>
                  {searchResults.length >= 8 && (
                    <div className="mt-4 text-center">
                      <Link
                        to={`/shop?search=${encodeURIComponent(searchQuery)}&audience=${audience}`}
                        onClick={onClose}
                        className="text-blue-500 hover:text-blue-600 font-medium"
                      >
                        View all results →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500">Try searching with different keywords in the current category</p>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Start searching</h3>
                <p className="text-gray-500">Type to search for products in {audience === 'NEXT' ? 'NEXT' : 'KIDS'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default SearchModal;

