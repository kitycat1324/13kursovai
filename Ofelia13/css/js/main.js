// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для обновления счетчика корзины
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Функция для добавления товара в корзину
function addToCart(productId) {
    const product = products[productId];
    
    if (!product) {
        alert('Товар не найден!');
        return;
    }
    
    // Проверить, есть ли товар уже в корзине
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1
        });
    }
    
    // Обновить счетчик корзины
    updateCartCount();
    
    // Сохранить корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Показать уведомление
    alert(`Товар "${product.name}" добавлен в корзину!`);
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    
    // Сохранить корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Если мы на странице корзины, обновить отображение
    if (document.getElementById('cart-items')) {
        updateCartDisplay();
    }
}

// Функция для обновления отображения корзины
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;
    
    // Очистить контейнер
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        // Показать сообщение о пустой корзине
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartTotal) cartTotal.textContent = '0 ₽';
        return;
    }
    
    // Скрыть сообщение о пустой корзине
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    
    // Добавить товары в корзину
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">${item.price.toLocaleString()} ₽ x ${item.quantity} = ${itemTotal.toLocaleString()} ₽</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Обновить общую сумму
    if (cartTotal) cartTotal.textContent = `${total.toLocaleString()} ₽`;
}

// Функция оформления заказа
function checkout() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }

    // Проверка авторизации
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Для оформления заказа необходимо войти в систему!');
        window.location.href = 'profile.html';
        return;
    }

    // Здесь можно добавить логику оформления заказа
    alert('Заказ успешно оформлен! Спасибо за покупку!');
    
    // Очистить корзину
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Обновить отображение если мы на странице корзины
    if (document.getElementById('cart-items')) {
        updateCartDisplay();
    }
    
    // Перенаправить на главную страницу
    window.location.href = 'index.html';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Если мы на странице корзины, обновить отображение
    if (document.getElementById('cart-items')) {
        updateCartDisplay();
    }
});