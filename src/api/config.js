/**
 * API Configuration
 * Uses environment variable for API URL
 * Production: https://tovo-b.developteam.site/kids/api
 */

// Vite environment variables must be prefixed with VITE_
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tovo-b.developteam.site/kids/api';

// Export individual parts if needed (host without /api)
export const API_HOST = import.meta.env.VITE_API_HOST || 'https://tovo-b.developteam.site/kids';

// Token refresh interval (in milliseconds)
// Access token expires in 15 minutes, refresh before that
export const TOKEN_REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes

// API timeout (in milliseconds)
export const API_TIMEOUT = 30000; // 30 seconds
