import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';

const Favorites = () => {
  // For demo purposes, showing all products as favorites
  const favoriteProducts = products.slice(0, 10);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Favorites</span>
      </nav>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
          <p className="text-gray-600 mb-6">Start adding products to your favorites!</p>
          <Link
            to="/shop"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Favorites</h1>
          <ProductGrid products={favoriteProducts} />

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              ‹
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              1
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">
              2
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              4
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              5
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;

