// Utility functions for TRIXIOBIXIO Streaming

// Enhanced notification system
class NotificationManager {
  static show(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.float = 'right';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.marginLeft = '10px';
    closeBtn.onclick = () => notification.remove();
    notification.appendChild(closeBtn);
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, duration);
    }
    
    return notification;
  }
  
  static success(message, duration) {
    return this.show(message, 'success', duration);
  }
  
  static error(message, duration) {
    return this.show(message, 'error', duration);
  }
  
  static warning(message, duration) {
    return this.show(message, 'warning', duration);
  }
}

// Enhanced loading system
class LoadingManager {
  static show(message = 'Loading...') {
    // Check if loading overlay already exists
    let overlay = document.getElementById('enhanced-loading-overlay');
    if (overlay) {
      overlay.querySelector('.loading-text').textContent = message;
      overlay.style.display = 'flex';
      return overlay;
    }
    
    // Create new overlay
    overlay = document.createElement('div');
    overlay.id = 'enhanced-loading-overlay';
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = `
      <div class="modal-content" style="text-align: center; background: rgba(0, 0, 0, 0.9); border: 1px solid #e50914;">
        <div class="enhanced-spinner" style="width: 50px; height: 50px; margin: 0 auto 20px;">
          <div class="loading" style="width: 100%; height: 100%;"></div>
        </div>
        <div class="loading-text" style="color: white; font-size: 1.2rem;">${message}</div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    return overlay;
  }
  
  static hide() {
    const overlay = document.getElementById('enhanced-loading-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }
  }
}

// Enhanced modal system
class ModalManager {
  static create(title, content, options = {}) {
    // Remove existing modal
    const existingModal = document.getElementById('enhanced-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'enhanced-modal';
    modal.className = 'modal-overlay';
    
    const buttons = options.buttons || [
      {
        text: 'Close',
        className: 'back-btn',
        onClick: () => this.close()
      }
    ];
    
    const buttonsHtml = buttons.map(btn => 
      `<button class="${btn.className || 'back-btn'}" style="margin: 5px;">${btn.text}</button>`
    ).join('');
    
    modal.innerHTML = `
      <div class="modal-content">
        <h2 style="color: #e50914; margin-top: 0;">${title}</h2>
        <div class="modal-body">${content}</div>
        <div class="modal-footer" style="margin-top: 20px; text-align: right;">
          ${buttonsHtml}
        </div>
      </div>
    `;
    
    // Add event listeners to buttons
    buttons.forEach((btn, index) => {
      if (btn.onClick) {
        const buttonElement = modal.querySelectorAll('.modal-footer button')[index];
        buttonElement.addEventListener('click', btn.onClick);
      }
    });
    
    document.body.appendChild(modal);
    
    // Add close on backdrop click
    if (options.closeOnBackdrop !== false) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.close();
      });
    }
    
    return modal;
  }
  
  static show(title, content, options = {}) {
    const modal = this.create(title, content, options);
    setTimeout(() => modal.classList.add('active'), 10);
    return modal;
  }
  
  static close() {
    const modal = document.getElementById('enhanced-modal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 300);
    }
  }
}

// Enhanced storage system
class StorageManager {
  static set(key, value, ttl = null) {
    const data = {
      value: value,
      timestamp: Date.now(),
      ttl: ttl
    };
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  static get(key, defaultValue = null) {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    
    try {
      const data = JSON.parse(item);
      
      // Check if expired
      if (data.ttl && (Date.now() - data.timestamp) > data.ttl) {
        this.remove(key);
        return defaultValue;
      }
      
      return data.value;
    } catch (e) {
      return defaultValue;
    }
  }
  
  static remove(key) {
    localStorage.removeItem(key);
  }
  
  static clear() {
    localStorage.clear();
  }
}

// Enhanced search functionality
class SearchManager {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  static highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark style="background: #e50914; color: white;">$1</mark>');
  }
  
  static fuzzySearch(items, searchTerm, keys) {
    if (!searchTerm) return items;
    
    const term = searchTerm.toLowerCase();
    return items.filter(item => {
      return keys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(term);
        }
        return false;
      });
    });
  }
}

// Enhanced animation utilities
class AnimationManager {
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.min(progress / duration, 1);
      
      element.style.opacity = opacity.toString();
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  static fadeOut(element, duration = 300) {
    let start = null;
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.max(initialOpacity - (initialOpacity * progress / duration), 0);
      
      element.style.opacity = opacity.toString();
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  static slideIn(element, direction = 'left', duration = 300) {
    const computedStyle = getComputedStyle(element);
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    
    let transform;
    switch (direction) {
      case 'left':
        transform = `translateX(-${width}px)`;
        break;
      case 'right':
        transform = `translateX(${width}px)`;
        break;
      case 'top':
        transform = `translateY(-${height}px)`;
        break;
      case 'bottom':
        transform = `translateY(${height}px)`;
        break;
      default:
        transform = `translateX(-${width}px)`;
    }
    
    element.style.transform = transform;
    element.style.display = 'block';
    
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const ease = Math.min(progress / duration, 1);
      
      element.style.transform = `translate(0, 0)`;
      element.style.opacity = ease.toString();
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// Enhanced form validation
class FormValidator {
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  static validatePassword(password, minLength = 6) {
    return password.length >= minLength;
  }
  
  static validateRequired(value) {
    return value && value.trim().length > 0;
  }
  
  static addValidation(form, rules) {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const formData = new FormData(form);
      
      for (const [field, rule] of Object.entries(rules)) {
        const value = formData.get(field);
        const fieldElement = form.querySelector(`[name="${field}"]`);
        
        if (rule.required && !this.validateRequired(value)) {
          this.showError(fieldElement, rule.messages?.required || 'This field is required');
          isValid = false;
          continue;
        }
        
        if (rule.email && !this.validateEmail(value)) {
          this.showError(fieldElement, rule.messages?.email || 'Please enter a valid email');
          isValid = false;
          continue;
        }
        
        if (rule.minLength && value.length < rule.minLength) {
          this.showError(fieldElement, rule.messages?.minLength || `Minimum length is ${rule.minLength} characters`);
          isValid = false;
          continue;
        }
        
        this.clearError(fieldElement);
      }
      
      if (!isValid) {
        e.preventDefault();
      }
      
      return isValid;
    });
  }
  
  static showError(element, message) {
    this.clearError(element);
    
    element.style.borderColor = '#e50914';
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#e50914';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    element.parentNode.insertBefore(errorElement, element.nextSibling);
  }
  
  static clearError(element) {
    element.style.borderColor = '';
    const errorElement = element.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }
}

// Enhanced accessibility features
class AccessibilityManager {
  static focusTrap(element, focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') {
    const focusableElements = element.querySelectorAll(focusableSelectors);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
  
  static skipToContent() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.position = 'absolute';
    skipLink.style.left = '-9999px';
    skipLink.style.zIndex = '1000';
    skipLink.style.padding = '10px';
    skipLink.style.background = '#e50914';
    skipLink.style.color = 'white';
    skipLink.style.textDecoration = 'none';
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.left = '10px';
      skipLink.style.top = '10px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

// Export all classes and functions
window.NotificationManager = NotificationManager;
window.LoadingManager = LoadingManager;
window.ModalManager = ModalManager;
window.StorageManager = StorageManager;
window.SearchManager = SearchManager;
window.AnimationManager = AnimationManager;
window.FormValidator = FormValidator;
window.AccessibilityManager = AccessibilityManager;