import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchOrderById } from "../api/orders";
import { useApp } from "../context/AppContext";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useApp();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/signin");
            return;
        }

        const getOrderDetails = async () => {
            try {
                setIsLoading(true);
                const response = await fetchOrderById(id);
                if (response.success) {
                    setOrder(response.data);
                } else {
                    setError(response.message || "Failed to fetch order details");
                }
            } catch (err) {
                console.error("Error fetching order details:", err);
                setError("An unexpected error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        getOrderDetails();
    }, [id, user, navigate]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
                <p className="text-gray-600 mb-8">{error || "The order you are looking for does not exist."}</p>
                <Link
                    to="/account"
                    className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                    Back to Account
                </Link>
            </div>
        );
    }

    const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "DELIVERED":
                return "bg-green-100 text-green-800";
            case "PENDING":
                return "bg-amber-100 text-amber-800";
            case "CANCELLED":
                return "bg-red-100 text-red-800";
            case "PROCESSING":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-gray-500">
                <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
                <span className="mx-2">›</span>
                <Link to="/account" className="hover:text-gray-900 transition-colors">My Account</Link>
                <span className="mx-2">›</span>
                <span className="text-gray-900">Order Details</span>
            </nav>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order #{order.id}</h1>
                    <p className="text-gray-600 mt-1">Placed on {orderDate}</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ${getStatusColor(order.status)}`}>
                        {order.status}
                    </span>
                    {/* Reorder Button could go here */}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content: Order Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">Order Items ({order.items?.length || 0})</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {order.items?.map((item) => (
                                <div key={item.id} className="p-6 flex items-center gap-4 sm:gap-6">
                                    <div className="w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                                        {item.product?.images?.[0] ? (
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.productName || item.product.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                                            {item.productName || item.product?.title || "Product Info Unavailable"}
                                        </h3>
                                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                                            {item.color && (
                                                <span className="flex items-center gap-1">
                                                    <span className="font-medium">Color:</span> {item.color}
                                                </span>
                                            )}
                                            {item.size && (
                                                <span className="flex items-center gap-1">
                                                    <span className="font-medium">Size:</span> {item.size}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium">Qty:</span> {item.quantity}
                                            </span>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-blue-600 font-bold text-lg">
                                                {parseFloat(item.priceAtPurchase).toFixed(2)} EGP
                                            </span>
                                            <span className="text-sm text-gray-400">
                                                Subtotal: {(parseFloat(item.priceAtPurchase) * item.quantity).toFixed(2)} EGP
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Order Summary & Info */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Summary Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 font-primary">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{parseFloat(order.subtotal || 0).toFixed(2)} EGP</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping Fees</span>
                                <span>{parseFloat(order.shippingFee || 0).toFixed(2)} EGP</span>
                            </div>
                            {parseFloat(order.discount || 0) > 0 && (
                                <div className="flex justify-between text-green-600 italic">
                                    <span>Discount</span>
                                    <span>-{parseFloat(order.discount).toFixed(2)} EGP</span>
                                </div>
                            )}
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-blue-600">{parseFloat(order.totalAmount).toFixed(2)} EGP</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 font-primary">Delivery Information</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Shipping Address</p>
                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                        {order.shippingAddress?.address}<br />
                                        {order.shippingAddress?.city}, {order.shippingAddress?.country}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Contact Number</p>
                                    <p className="text-sm text-gray-600 mt-1">{order.billingInfo?.phone}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Payment Method</p>
                                    <p className="text-sm text-gray-600 mt-1">{order.paymentMethod === 'COD' ? 'Cash On Delivery' : 'Credit Card'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
