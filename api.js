// API Helper for TRIXIOBIXIO Streaming Platform

class TMDbAPI {
  constructor(config) {
    this.apiKey = config.TMDB_API_KEY;
    this.baseUrl = config.TMDB_API_BASE;
    this.imageBase = config.TMDB_IMAGE_BASE;
    this.language = config.DEFAULT_LANGUAGE;
  }
  
  // Generic API request method
  async request(endpoint, params = {}) {
    const urlParams = new URLSearchParams({
      api_key: this.apiKey,
      language: this.language,
      ...params
    });
    
    const url = `${this.baseUrl}/${endpoint}?${urlParams}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
  
  // Movie-related endpoints
  async getTrending(timeWindow = 'week') {
    return this.request(`trending/all/${timeWindow}`);
  }
  
  async getNowPlaying(page = 1) {
    return this.request('movie/now_playing', { page });
  }
  
  async getPopularMovies(page = 1) {
    return this.request('movie/popular', { page });
  }
  
  async getMovieDetails(movieId) {
    return this.request(`movie/${movieId}`);
  }
  
  async getMovieCredits(movieId) {
    return this.request(`movie/${movieId}/credits`);
  }
  
  // TV-related endpoints
  async getOnTheAir(page = 1) {
    return this.request('tv/on_the_air', { page });
  }
  
  async getPopularTV(page = 1) {
    return this.request('tv/popular', { page });
  }
  
  async getTVDetails(tvId) {
    return this.request(`tv/${tvId}`);
  }
  
  async getTVSeason(tvId, seasonNumber) {
    return this.request(`tv/${tvId}/season/${seasonNumber}`);
  }
  
  async getTVEpisode(tvId, seasonNumber, episodeNumber) {
    return this.request(`tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`);
  }
  
  // Search functionality
  async search(query, page = 1) {
    if (!query) return { results: [] };
    return this.request('search/multi', { query, page });
  }
  
  // Image URL helper
  getImageUrl(path, size = 'w500') {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${this.imageBase}/${size}${path}`;
  }
  
  // Get backdrop image URL
  getBackdropUrl(path, size = 'w1280') {
    if (!path) return 'https://via.placeholder.com/1280x720?text=No+Backdrop';
    return `${this.imageBase}/${size}${path}`;
  }
}

// Streaming API helper
class StreamingAPI {
  constructor(config) {
    this.provider = config.STREAMING_PROVIDER;
    this.corsProxies = config.CORS_PROXIES;
    this.currentProxy = this.corsProxies[1]; // Default to corsproxy.io
  }
  
  // Apply CORS proxy to URL
  applyCorsProxy(url) {
    // Check if URL already has a proxy
    for (const proxy of this.corsProxies) {
      if (url.includes(proxy)) {
        return url;
      }
    }
    
    // Apply current proxy
    return `https://${this.currentProxy}${url}`;
  }
  
  // Change CORS proxy
  changeProxy(proxyIndex) {
    if (proxyIndex >= 0 && proxyIndex < this.corsProxies.length) {
      this.currentProxy = this.corsProxies[proxyIndex];
      return true;
    }
    return false;
  }
  
  // Get stream URL for movie or TV show
  async getStreamUrl(contentId, isMovie = true, season = null, episode = null) {
    try {
      let url = `https://${this.provider}/${isMovie ? 'movie' : 'tv'}/${contentId}`;
      
      if (!isMovie && season && episode) {
        url += `/${season}/${episode}`;
      }
      
      // For demo purposes, we'll return a mock response
      // In a real implementation, this would fetch the actual stream
      return {
        url: url,
        proxiedUrl: this.applyCorsProxy(url),
        type: 'application/x-mpegURL'
      };
    } catch (error) {
      console.error('Error getting stream URL:', error);
      throw error;
    }
  }
}

// Initialize APIs
const config = typeof TRIXIOBIXIO_CONFIG !== 'undefined' ? TRIXIOBIXIO_CONFIG : {
  TMDB_API_KEY: '8265bd1679663a7ea12ac168da84d2e8',
  TMDB_API_BASE: 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE: 'https://image.tmdb.org/t/p/w500',
  DEFAULT_LANGUAGE: 'it-IT',
  STREAMING_PROVIDER: 'vixsrc.to',
  CORS_PROXIES: [
    'cors-anywhere.com/',
    'corsproxy.io/',
    'api.allorigins.win/raw?url='
  ]
};

const tmdbAPI = new TMDbAPI(config);
const streamingAPI = new StreamingAPI(config);

// Export APIs
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TMDbAPI, StreamingAPI, tmdbAPI, streamingAPI };
} else {
  window.TMDB_API = tmdbAPI;
  window.STREAMING_API = streamingAPI;
}