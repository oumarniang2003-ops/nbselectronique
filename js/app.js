// Global Shopping Cart State and Logic
class ECommerceApp {
  constructor() {
    this.cartKey = 'dakar_electro_cart';
    this.cart = this.loadCart();
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.updateCartBadge();
      this.setupMobileMenu();
    });
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const stored = localStorage.getItem(this.cartKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error loading cart", e);
      return [];
    }
  }

  // Save cart to localStorage
  saveCart() {
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
      this.updateCartBadge();
      // Dispatch custom event to notify other scripts of cart update
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: this.cart }));
    } catch (e) {
      console.error("Error saving cart", e);
    }
  }

  // Add item to cart
  async addToCart(productId, quantity = 1) {
    // Charge les produits depuis la base de données si ce n'est pas déjà fait
    await loadProducts();

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      this.showToast("Produit non trouvé.", "danger");
      return;
    }

    const existingIndex = this.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += parseInt(quantity);
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || '',
        category: product.category,
        categoryDisplay: product.categoryDisplay || '',
        quantity: parseInt(quantity)
      });
    }

    this.saveCart();
    this.showToast(`"${product.name}" ajouté au panier !`, "success");
    this.animateCartIcon();
  }

  // Remove item from cart
  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.showToast("Produit retiré du panier.", "success");
  }

  // Update item quantity
  updateQuantity(productId, quantity) {
    const qty = parseInt(quantity);
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = qty;
      this.saveCart();
    }
  }

  // Get total item count in cart
  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Get total price of cart items (excluding shipping)
  getCartSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Update navbar badge count
  updateCartBadge() {
    const count = this.getCartCount();
    // Update all badge count elements
    document.querySelectorAll('#cart-badge-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline' : 'none';
    });
    // Legacy badge
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  // Format prices to French style with dots: e.g. 450000 -> 450.000 FCFA
  formatPrice(price) {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA";
  }

  // Setup mobile responsive menu
  setupMobileMenu() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
          menu.classList.remove('active');
        }
      });
    }
  }

  // Create and display premium toast notifications
  showToast(message, type = "success") {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Choose icon
    const icon = type === "success" ? "✓" : "⚠";
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation frame for CSS transition
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

  // Shaking animation on the cart icon when item added
  animateCartIcon() {
    const cartWrapper = document.querySelector('.cart-icon-wrapper');
    if (cartWrapper) {
      cartWrapper.classList.add('pulse');
      setTimeout(() => {
        cartWrapper.classList.remove('pulse');
      }, 500);
    }
  }
}

// Instantiate ECommerceApp globally
const app = new ECommerceApp();
