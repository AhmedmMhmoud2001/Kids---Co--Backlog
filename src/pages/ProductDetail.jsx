import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import Loading from '../components/common/Loading';
import { useProduct } from '../hooks/useProducts';
import { getColorSwatchStyle } from '../api/products';
import { fetchShowOutOfStock } from '../api/settings';
import { ChevronUp, ChevronDown } from 'lucide-react';

const DEFAULT_LOW_STOCK = 5;

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError, error, refetch } = useProduct(id);
  const { addToCart, setIsCartOpen } = useApp();
  const [showOutOfStock, setShowOutOfStock] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [visibleThumbStart, setVisibleThumbStart] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchShowOutOfStock().then(setShowOutOfStock);
  }, []);

  const displayColors = useMemo(() => {
    if (!product?.colors?.length) return [];
    if (showOutOfStock || !(product.variants?.length)) return product.colors;
    const hasStock = (colorName) => {
      const name = (colorName ?? '').toString().toLowerCase().trim();
      return (product.variants || []).some((v) => {
        const vc = (v.color?.name ?? '').toString().toLowerCase().trim();
        return vc === name && (v.stock ?? 0) > 0;
      });
    };
    return product.colors.filter((c) => hasStock(c));
  }, [product, showOutOfStock]);

  const safeSelectedColor = displayColors.length ? Math.min(selectedColor, displayColors.length - 1) : 0;
  const colorNameForSizes = displayColors[safeSelectedColor];

  const displaySizes = useMemo(() => {
    if (!product?.sizes?.length) return [];
    if (!colorNameForSizes) return product.sizes;
    const colorLower = (colorNameForSizes ?? '').toString().toLowerCase().trim();
    const variantsForColor = (product.variants || []).filter(
      (v) => (v.color?.name ?? '').toString().toLowerCase().trim() === colorLower
    );
    const sizeNamesForColor = [...new Set(variantsForColor.map((v) => (v.size?.name ?? '').toString().trim()).filter(Boolean))];
    const ordered = product.sizes.filter((s) => {
      const name = (typeof s === 'string' ? s : s?.name ?? '').toString().toLowerCase().trim();
      return sizeNamesForColor.some((n) => n.toLowerCase().trim() === name);
    });
    if (ordered.length > 0 && !showOutOfStock && variantsForColor.length > 0) {
      const withStock = variantsForColor.filter((v) => (v.stock ?? 0) > 0);
      const sizeNamesWithStock = [...new Set(withStock.map((v) => (v.size?.name ?? '').toString().trim()).filter(Boolean))];
      return ordered.filter((s) => {
        const name = (typeof s === 'string' ? s : s?.name ?? '').toString().toLowerCase().trim();
        return sizeNamesWithStock.some((n) => n.toLowerCase().trim() === name);
      });
    }
    return ordered.length > 0 ? ordered : sizeNamesForColor;
  }, [product, showOutOfStock, colorNameForSizes]);

  const safeSelectedSize = displaySizes.length ? Math.min(selectedSize, displaySizes.length - 1) : 0;

  // All hooks must run before any early return (Rules of Hooks)
  const images = useMemo(() => {
    if (!product) return [];
    const colorName = displayColors?.[safeSelectedColor] ?? product.colors?.[safeSelectedColor];
    if (product.colorImages && product.colorImages.length > 0 && colorName) {
      const nameLower = (colorName || '').toString().toLowerCase().trim();
      const forColor = product.colorImages
        .filter((ci) => {
          const ciName = (ci.color?.name ?? ci.colorName ?? '').toString().toLowerCase().trim();
          return ciName && (ciName === nameLower || ci.color?.name === colorName);
        })
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((ci) => ci.imageUrl)
        .filter(Boolean);
      if (forColor.length > 0) return forColor;
    }
    return (product.images && product.images.length > 0)
      ? product.images.slice(0, 12)
      : (product.image ? [product.image] : []);
  }, [product, displayColors, safeSelectedColor]);

  const THUMB_VISIBLE = 6;
  const thumbCount = images?.length ?? 0;
  const maxThumbStart = Math.max(0, thumbCount - THUMB_VISIBLE);
  const clampedThumbStart = Math.min(Math.max(0, visibleThumbStart), maxThumbStart);
  const effectiveThumbStart = thumbCount <= THUMB_VISIBLE ? 0 : clampedThumbStart;

  useEffect(() => {
    // eslint-disable-next-line -- reset thumb window when color changes
    setVisibleThumbStart(0);
  }, [safeSelectedColor]);

  useEffect(() => {
    if (thumbCount <= THUMB_VISIBLE) {
      // eslint-disable-next-line -- clamp thumb window to image count
      setVisibleThumbStart(0);
    } else {
      setVisibleThumbStart((prev) => Math.min(prev, maxThumbStart));
    }
  }, [thumbCount, maxThumbStart, THUMB_VISIBLE]);

  const visibleThumbnails = useMemo(() => {
    if (!images?.length) return [];
    return images.slice(effectiveThumbStart, effectiveThumbStart + THUMB_VISIBLE).map((img, i) => ({ img, globalIndex: effectiveThumbStart + i }));
  }, [images, effectiveThumbStart]);

  const selectedVariant = useMemo(() => {
    if (!product?.variants || !displayColors.length || !displaySizes.length) return null;
    const colorName = displayColors[safeSelectedColor];
    const sizeName = displaySizes[safeSelectedSize];
    if (!colorName || !sizeName) return null;
    const colorLower = (colorName ?? '').toString().toLowerCase().trim();
    const sizeLower = (sizeName ?? '').toString().toLowerCase().trim();
    const match = (v) => {
      const vc = (v.color?.name ?? '').toString().toLowerCase().trim();
      const vs = (v.size?.name ?? '').toString().toLowerCase().trim();
      return vc === colorLower && vs === sizeLower;
    };
    const matchColorOnly = (v) => (v.color?.name ?? '').toString().toLowerCase().trim() === colorLower;
    return product.variants.find(match) || product.variants.find(matchColorOnly) || product.variants[0];
  }, [product, displayColors, displaySizes, safeSelectedColor, safeSelectedSize]);

  // Stock status computed per variant (not stored in DB): In Stock (qty > threshold), Low Stock (0 < qty <= threshold), Out of Stock (qty === 0)
  const stockStatus = useMemo(() => {
    if (!selectedVariant) return 'in_stock';
    const stock = selectedVariant.stock ?? 0;
    if (stock === 0) return 'out_of_stock';
    const threshold = selectedVariant.lowStockThreshold ?? DEFAULT_LOW_STOCK;
    return stock <= threshold ? 'low_stock' : 'in_stock';
  }, [selectedVariant]);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <Loading />
      </div>
    );
  }
  if (isError || !product) {
    return (
      <div className="py-20 text-center px-4">
        <p className="text-red-500 mb-4">{error?.message || 'Product not available'}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => refetch()} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Try again
          </button>
          <Link to="/shop" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const safeSelectedImage = Math.min(selectedImage, Math.max(0, images.length - 1));
  const getCategoryPath = () => product.categorySlug || 'shop';
  const getCategoryDisplayName = () => product.categoryName || 'Shop';
  const displayPrice = selectedVariant?.price ?? product.price ?? product.basePrice;
  const displaySku = selectedVariant?.sku ?? product.sku;
  const isOutOfStock = stockStatus === 'out_of_stock';

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const size = displaySizes?.[safeSelectedSize];
    const color = displayColors?.[safeSelectedColor];
    const imageForColor = images.length > 0 ? images[0] : product.image;
    const productWithVariantPrice = { ...product, price: displayPrice, image: imageForColor };
    addToCart(productWithVariantPrice, quantity, size, color, selectedVariant?.id);
    setIsCartOpen(true);
  };

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/product/${product.id}` : '';
  const shareTitle = product.name || 'Product';
  const shareText = `${shareTitle} - ${Number(displayPrice ?? 0).toFixed(2)} EGP`;

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    const encodedTitle = encodeURIComponent(shareTitle);
    let url = '';
    if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    } else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    } else if (platform === 'pinterest') {
      const img = images[0] || product.image;
      url = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}${img ? `&media=${encodeURIComponent(img)}` : ''}`;
    }
    if (url) window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="py-3 sm:py-4 md:py-6 lg:py-8 container mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
      {/* Breadcrumb */}
      <div className="mb-3 sm:mb-4">
        <Breadcrumb items={[
          { label: product.audience === 'NEXT' ? 'Home 2' : 'Home', to: product.audience === 'NEXT' ? '/home2' : '/' },
          { label: getCategoryDisplayName(), to: `/category/${getCategoryPath()}?audience=${product.audience}` },
          { label: product.name },
        ]} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-8 lg:gap-12 max-w-full overflow-hidden">

        {/* Product Images */}
        <div className="w-full max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-5">
            {/* Main Image */}
            <div className="order-1 sm:order-2 w-full sm:flex-1 h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded">
              <img
                src={images[safeSelectedImage] || null}
                alt={product.name}
                className="w-full h-full object-contain bg-gray-50"
              />
            </div>

            {/* Thumbnails: 6 visible, arrows to move */}
            <div className="order-2 sm:order-1 flex sm:flex-col items-center gap-1 sm:gap-1.5 w-full sm:w-[50px] md:w-[60px] shrink-0 -mx-1 px-1 sm:mx-0 sm:px-0">
              {thumbCount > THUMB_VISIBLE && (
                <button
                  type="button"
                  onClick={() => setVisibleThumbStart((i) => Math.max(0, i - 1))}
                  disabled={effectiveThumbStart <= 0}
                  className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Previous images"
                >
                  <ChevronUp size={18} />
                </button>
              )}
              <div className="flex sm:flex-col gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-visible -mx-1 px-1 sm:mx-0 sm:px-0">
                {visibleThumbnails.map(({ img, globalIndex }) => (
                  <button
                    key={globalIndex}
                    type="button"
                    onClick={() => setSelectedImage(globalIndex)}
                    className={`flex-shrink-0 w-[45px] h-[50px] sm:w-[50px] sm:h-[55px] md:w-[60px] md:h-[65px] border overflow-hidden transition-all rounded ${safeSelectedImage === globalIndex
                      ? 'border-blue-500 border-2 ring-1 ring-blue-300'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <img
                      src={img || null}
                      alt={`Thumbnail ${globalIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              {thumbCount > THUMB_VISIBLE && (
                <button
                  type="button"
                  onClick={() => setVisibleThumbStart((i) => Math.min(maxThumbStart, i + 1))}
                  disabled={effectiveThumbStart >= maxThumbStart}
                  className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Next images"
                >
                  <ChevronDown size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-3 sm:space-y-4 md:space-y-5 w-full max-w-full">
          <div>
            <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2 md:mb-3 leading-tight break-words">{product.name}</h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-blue-500 font-semibold">
              {Number(displayPrice ?? product.price ?? product.basePrice ?? 0).toFixed(2)} EGP
            </p>
            {product.variants?.length > 0 && (
              <div className="mt-1.5 space-y-0.5">
                <p className={`text-sm font-semibold ${stockStatus === 'out_of_stock' ? 'text-red-600' : stockStatus === 'low_stock' ? 'text-amber-600' : 'text-green-600'}`}>
                  {stockStatus === 'out_of_stock' ? 'Out of stock' : stockStatus === 'low_stock' ? 'Low stock' : 'In stock'}
                </p>
                {stockStatus === 'low_stock' && selectedVariant && (
                  <p className="text-sm text-amber-700 font-medium" role="alert">
                    Only {selectedVariant.stock ?? 0} left
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Color Selection */}
          {displayColors && displayColors.length > 0 && (
            <div className="w-full max-w-full">
              <h3 className="font-semibold text-sm sm:text-base mb-2">Color:</h3>
              <div className="flex gap-2 flex-wrap">
                {displayColors.map((color, idx) => {
                  const swatchStyle = getColorSwatchStyle(color);
                  const hasBg = swatchStyle.backgroundColor;
                  return (
                    <button
                      key={idx}
                      onClick={() => { setSelectedColor(idx); setSelectedImage(0); setVisibleThumbStart(0); }}
                      className={`rounded-full border-2 transition-all flex items-center justify-center ${safeSelectedColor === idx
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-300 hover:border-gray-400'
                        } ${hasBg ? 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10' : 'min-w-[2.5rem] h-8 sm:h-9 px-2 text-xs sm:text-sm'
                        }`}
                      style={hasBg ? swatchStyle : {}}
                      title={typeof color === 'string' ? color : ''}
                    >
                      {!hasBg && <span className="text-gray-700">{color}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {displaySizes && displaySizes.length > 0 && (
            <div className="w-full max-w-full">
              <h3 className="font-semibold text-sm sm:text-base mb-2">Size:</h3>
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {displaySizes.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(idx)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border rounded transition-all ${safeSelectedSize === idx
                      ? 'border-blue-500 bg-blue-50 text-blue-600 font-semibold'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 md:gap-4 w-full">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded w-full sm:w-auto shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 sm:px-4 py-2.5 hover:bg-gray-100 active:bg-gray-200 transition-colors text-lg font-medium"
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 sm:w-14 text-center border-x border-gray-300 py-2.5 text-sm sm:text-base font-medium"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 sm:px-4 py-2.5 hover:bg-gray-100 active:bg-gray-200 transition-colors text-lg font-medium"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full sm:flex-1 font-semibold py-2.5 px-4 text-sm sm:text-base transition-colors rounded ${isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white'
                }`}
            >
              {isOutOfStock ? 'Out of stock' : 'Add to cart'}
            </button>
          </div>

          {/* Description */}
          <div className="w-full max-w-full">
            <h3 className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">Description:</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">
              {product.description}
            </p>
          </div>
          {/* Product Meta */}
          <div className="pt-4 sm:pt-6 border-t space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex gap-2">
              <span className="font-semibold">SKU:</span>
              <span className="text-gray-600">{displaySku || product.sku || '-'}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Category:</span>
              <span className="text-gray-600">{product.categoryName}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Brand:</span>
              <span className="text-gray-600">{product.brand || 'No Brand'}</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="pt-3 sm:pt-4 border-t">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="font-semibold text-xs sm:text-sm">Share:</span>
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => handleShare('facebook')}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleShare('twitter')}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Share on X (Twitter)"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1da1f2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleShare('pinterest')}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Share on Pinterest"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#bd081c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {product.additionalInfo && (
            <details className="border-t pt-3 sm:pt-4">
              <summary className="font-semibold text-sm sm:text-base cursor-pointer flex items-center justify-between">
                Additional Information
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                <p>{product.additionalInfo}</p>
              </div>
            </details>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
