// Main JavaScript file for TRIXIOBIXIO Streaming Platform

// Import configuration
let CONFIG;
if (typeof TRIXIOBIXIO_CONFIG !== 'undefined') {
  CONFIG = TRIXIOBIXIO_CONFIG;
} else {
  // Fallback configuration
  CONFIG = {
    APP_NAME: 'TRIXIOBIXIO Streaming',
    VERSION: '1.0.0',
    ACCESS_PASSWORD: 'trixio123',
    PRIMARY_COLOR: '#e50914'
  };
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log(`%c ${CONFIG.APP_NAME} v${CONFIG.VERSION} initialized`, 
    `color: ${CONFIG.PRIMARY_COLOR}; font-weight: bold;`);
  
  // Initialize enhanced features if available
  initializeEnhancedFeatures();
});

// Initialize enhanced features from utils.js
function initializeEnhancedFeatures() {
  // Check if utils.js is loaded
  if (typeof NotificationManager !== 'undefined') {
    // Add keyboard shortcuts for notifications
    document.addEventListener('keydown', function(e) {
      // Ctrl+Shift+N for notification demo
      if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        e.preventDefault();
        NotificationManager.success('Enhanced features loaded successfully!');
      }
    });
    
    console.log('Enhanced features initialized');
  }
  
  // Check if components are loaded
  if (typeof MediaCard !== 'undefined') {
    console.log('Media components loaded');
  }
  
  // Check if APIs are loaded
  if (typeof TMDB_API !== 'undefined') {
    console.log('API modules loaded');
  }
}

// Enhanced password form handling
function initializeEnhancedLoginForm() {
  const passwordForm = document.getElementById('password-form');
  if (!passwordForm) return;
  
  passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (password === CONFIG.ACCESS_PASSWORD) {
      // Enhanced success handling
      if (typeof NotificationManager !== 'undefined') {
        NotificationManager.success('Access granted! Welcome to TRIXIOBIXIO Streaming.', 2000);
      }
      
      // Add a small delay for visual feedback
      setTimeout(function() {
        // Check if we're in the combined file (prova.html)
        const landingPage = document.getElementById('landing-page');
        const mainApp = document.getElementById('main-app');
        
        if (landingPage && mainApp) {
          // Hide landing page and show main app
          landingPage.style.display = 'none';
          mainApp.style.display = 'block';
          // Initialize the main app
          if (typeof initializeApp !== 'undefined') {
            initializeApp();
          }
        } else {
          // Redirect to main app
          window.location.href = 'Code/index.html';
        }
      }, 1000);
    } else {
      // Enhanced error handling
      if (typeof AnimationManager !== 'undefined') {
        const passwordSection = document.querySelector('.password-section');
        AnimationManager.slideIn(passwordSection, 'right', 300);
      }
      
      if (typeof NotificationManager !== 'undefined') {
        NotificationManager.error('Incorrect password. Please try again.');
      } else {
        // Fallback to original error handling
        errorMessage.style.display = 'block';
        document.querySelector('.password-section').animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(0)' }
        ], {
          duration: 300,
          iterations: 1
        });
      }
      
      // Clear password field
      document.getElementById('password').value = '';
      
      // Focus on password field
      setTimeout(() => {
        document.getElementById('password').focus();
      }, 100);
    }
  });
}

// Enhanced search functionality
function initializeEnhancedSearch() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;
  
  // Add search icon
  const searchContainer = searchInput.parentNode;
  if (!searchContainer.querySelector('.search-icon')) {
    const searchIcon = document.createElement('span');
    searchIcon.className = 'search-icon';
    searchIcon.innerHTML = '🔍';
    searchIcon.style.position = 'absolute';
    searchIcon.style.left = '15px';
    searchIcon.style.top = '50%';
    searchIcon.style.transform = 'translateY(-50%)';
    searchIcon.style.pointerEvents = 'none';
    searchContainer.insertBefore(searchIcon, searchInput);
    
    // Adjust input padding
    searchInput.style.paddingLeft = '40px';
  }
  
  // Enhanced search with debounce
  let searchTimeout;
  searchInput.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();
    
    if (query.length < 2) {
      hideSearchResults();
      return;
    }
    
    searchTimeout = setTimeout(() => {
      performEnhancedSearch(query);
    }, 300);
  });
}

// Perform enhanced search
function performEnhancedSearch(query) {
  if (typeof LoadingManager !== 'undefined') {
    LoadingManager.show('Searching...');
  }
  
  // Simulate search delay
  setTimeout(() => {
    if (typeof LoadingManager !== 'undefined') {
      LoadingManager.hide();
    }
    
    if (typeof NotificationManager !== 'undefined') {
      NotificationManager.show(`Search results for "${query}"`, 'info', 2000);
    }
    
    // In a real implementation, this would call the API
    // For demo purposes, we'll just show a message
    console.log(`Searching for: ${query}`);
  }, 800);
}

// Hide search results
function hideSearchResults() {
  const resultsDiv = document.getElementById('results');
  if (resultsDiv) {
    resultsDiv.style.display = 'none';
  }
  
  const homeDiv = document.getElementById('home');
  if (homeDiv) {
    homeDiv.style.display = 'block';
  }
}

// Enhanced carousel navigation
function initializeEnhancedCarousels() {
  // Add keyboard navigation to carousels
  document.addEventListener('keydown', function(e) {
    // Check if we're in a carousel
    const activeElement = document.activeElement;
    if (activeElement && activeElement.closest('.carousel')) {
      const carousel = activeElement.closest('.carousel');
      const sectionId = carousel.closest('section').id;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          scrollCarousel(sectionId, -1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          scrollCarousel(sectionId, 1);
          break;
      }
    }
  });
}

// Enhanced scroll carousel function
function scrollCarousel(sectionId, direction) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  const carousel = section.querySelector('.carousel');
  if (!carousel) return;
  
  const scrollAmount = carousel.clientWidth * 0.8;
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
  
  // Add visual feedback
  if (typeof NotificationManager !== 'undefined') {
    const directionText = direction > 0 ? 'next' : 'previous';
    // Only show notification for manual navigation
    // Uncomment the next line if you want notifications for carousel navigation
    // NotificationManager.show(`Showing ${directionText} items`, 'info', 1000);
  }
}

// Initialize all enhanced features
function initializeAllFeatures() {
  initializeEnhancedLoginForm();
  initializeEnhancedSearch();
  initializeEnhancedCarousels();
  
  // Add global keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+H to go home
    if (e.ctrlKey && e.shiftKey && e.key === 'H') {
      e.preventDefault();
      goHome();
    }
    
    // Ctrl+Shift+S for search focus
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
      e.preventDefault();
      const searchInput = document.getElementById('search');
      if (searchInput) {
        searchInput.focus();
      }
    }
  });
}

// Go to home screen
function goHome() {
  // Hide player and results
  const player = document.getElementById('player');
  const results = document.getElementById('results');
  
  if (player) player.style.display = 'none';
  if (results) results.style.display = 'none';
  
  // Show home
  const home = document.getElementById('home');
  if (home) home.style.display = 'block';
  
  // Scroll to top
  window.scrollTo(0, 0);
  
  if (typeof NotificationManager !== 'undefined') {
    NotificationManager.show('Returned to home screen', 'info', 1500);
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAllFeatures);
} else {
  initializeAllFeatures();
}

// Export functions for global access
window.initializeEnhancedLoginForm = initializeEnhancedLoginForm;
window.initializeEnhancedSearch = initializeEnhancedSearch;
window.initializeEnhancedCarousels = initializeEnhancedCarousels;
window.initializeAllFeatures = initializeAllFeatures;
window.goHome = goHome;