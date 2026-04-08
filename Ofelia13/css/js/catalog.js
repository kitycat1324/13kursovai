// Основной скрипт для каталога
class Catalog {
    constructor() {
        this.currentCategory = 'all';
        this.currentSort = 'default';
        this.products = products;
        this.init();
    }

    init() {
        this.renderCategoryFilter();
        this.renderProducts();
        this.setupEventListeners();
        this.updateCartCount();
    }

    // Рендер фильтра категорий
    renderCategoryFilter() {
        const filterContainer = document.getElementById('category-filter');
        
        filterContainer.innerHTML = categories.map(category => `
            <button class="category-btn ${this.currentCategory === category.id ? 'active' : ''}" 
                    data-category="${category.id}">
                <i class="fas ${category.icon}"></i> ${category.name}
            </button>
        `).join('');
    }

    // Рендер товаров
    renderProducts() {
        const container = document.getElementById('products-grid');
        
        // Фильтрация по категории
        let filteredProducts = this.currentCategory === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === this.currentCategory);
        
        // Сортировка
        filteredProducts = this.sortProducts(filteredProducts, this.currentSort);
        
        if (filteredProducts.length === 0) {
            container.innerHTML = this.getNoProductsHTML();
            return;
        }
        
        container.innerHTML = filteredProducts.map(product => `
            <div class="product-card" onclick="catalog.openProduct(${product.id})">
                <div class="product-image">
                    ${this.getProductBadge(product)}
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${product.price.toLocaleString()} ₽</div>
                    <ul class="product-features">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <button class="btn btn-block" onclick="event.stopPropagation(); catalog.addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> В корзину
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Сортировка товаров
    sortProducts(products, sortType) {
        const sorted = [...products];
        
        switch (sortType) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return sorted;
        }
    }

    // Получение бейджа для товара
    getProductBadge(product) {
        if (!product.badge) return '';
        
        const badges = {
            'sale': { text: 'АКЦИЯ', class: 'sale' },
            'new': { text: 'НОВИНКА', class: 'new' },
            'hit': { text: 'ХИТ', class: 'hit' },
            'premium': { text: 'ПРЕМИУМ', class: 'premium' }
        };
        
        const badge = badges[product.badge];
        return badge ? `<div class="sale-badge ${badge.class}">${badge.text}</div>` : '';
    }

    // Сообщение при отсутствии товаров
    getNoProductsHTML() {
        return `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>Товары не найдены</h3>
                <p>Попробуйте выбрать другую категорию</p>
            </div>
        `;
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        // Обработчики категорий
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.closest('.category-btn').dataset.category;
                this.setCategory(category);
            });
        });

        // Обработчик сортировки
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderProducts();
        });
    }

    // Установка категории
    setCategory(category) {
        this.currentCategory = category;
        
        // Обновляем активную кнопку
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Перерисовываем товары
        this.renderProducts();
    }

    // Добавление в корзину
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
        this.showNotification(`"${product.name}" добавлен в корзину`);
    }

    // Обновление счетчика корзины
    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }

    // Открытие страницы товара
    openProduct(productId) {
        window.location.href = `product.html?id=${productId}`;
    }

    // Показать уведомление
    showNotification(message) {
        // Создаем временное уведомление
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Автоудаление
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Инициализация каталога когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.catalog = new Catalog();
});