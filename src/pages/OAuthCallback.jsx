import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { fetchMe } from '../api/auth';

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useApp();
    const [error, setError] = useState('');

    useEffect(() => {
        const handleCallback = async () => {
            const token = searchParams.get('token');
            const errorParam = searchParams.get('error');

            if (errorParam) {
                setError('Authentication failed. Please try again.');
                setTimeout(() => navigate('/signin'), 3000);
                return;
            }

            if (!token) {
                setError('No authentication token received.');
                setTimeout(() => navigate('/signin'), 3000);
                return;
            }

            try {
                // Store the token
                localStorage.setItem('authToken', token);

                // Fetch user data
                const res = await fetchMe();
                
                if (res.success) {
                    // Login user in context
                    login(res.data);
                    
                    // Navigate to homepage
                    navigate('/');
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (err) {
                console.error('OAuth callback error:', err);
                setError('Authentication failed. Please try again.');
                localStorage.removeItem('authToken');
                setTimeout(() => navigate('/signin'), 3000);
            }
        };

        handleCallback();
    }, [searchParams, navigate, login]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                {error ? (
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-red-600 font-medium">{error}</p>
                        <p className="text-gray-500 text-sm">Redirecting to sign in...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-gray-600">Completing sign in...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OAuthCallback;
