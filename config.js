// Configuration file for TRIXIOBIXIO Streaming Platform

const CONFIG = {
  // Application settings
  APP_NAME: 'TRIXIOBIXIO Streaming',
  VERSION: '1.0.0',
  ENVIRONMENT: 'development', // development, production
  
  // Branding
  BRAND_NAME: 'TRIXIOBIXIO',
  BRAND_SHORT: 'TRB',
  PRIMARY_COLOR: '#e50914',
  SECONDARY_COLOR: '#b20710',
  
  // API settings
  TMDB_API_KEY: '8265bd1679663a7ea12ac168da84d2e8', // Public demo key
  TMDB_API_BASE: 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE: 'https://image.tmdb.org/t/p/w500',
  
  // Streaming settings
  STREAMING_PROVIDER: 'vixsrc.to',
  CORS_PROXIES: [
    'cors-anywhere.com/',
    'corsproxy.io/',
    'api.allorigins.win/raw?url='
  ],
  
  // UI settings
  DEFAULT_LANGUAGE: 'it-IT',
  RESULTS_PER_PAGE: 20,
  CAROUSEL_ITEMS: 10,
  
  // Authentication
  ACCESS_PASSWORD: 'trixio123', // Default password for demo purposes
  SESSION_TIMEOUT: 3600000, // 1 hour in milliseconds
  
  // Performance
  SEARCH_DEBOUNCE: 500, // milliseconds
  LAZY_LOAD_OFFSET: 200, // pixels
  CACHE_TTL: 300000, // 5 minutes in milliseconds
  
  // Features
  ENABLE_KEYBOARD_SHORTCUTS: true,
  ENABLE_ANIMATIONS: true,
  ENABLE_NOTIFICATIONS: true,
  
  // Endpoints
  ENDPOINTS: {
    trending: 'trending/all/week',
    nowPlaying: 'movie/now_playing',
    popularMovies: 'movie/popular',
    onTheAir: 'tv/on_the_air',
    popularTV: 'tv/popular'
  }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  window.TRIXIOBIXIO_CONFIG = CONFIG;
}