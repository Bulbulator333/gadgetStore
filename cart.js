// Получаем элементы DOM
const cartItemsContainer = document.getElementById('cart-items');
const totalItemsElement = document.getElementById('total-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Загружаем корзину из localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Отображаем корзину
function renderCart() {
    // Очищаем контейнер
    cartItemsContainer.innerHTML = '';
    
    // Если корзина пуста
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Ваша корзина пуста</p>
                <a href="catalog.html" class="cta-button">Перейти в каталог</a>
            </div>
        `;
        totalItemsElement.textContent = '0';
        totalPriceElement.textContent = '0 ₽';
        checkoutBtn.disabled = true;
        updateCartCounter();
        return;
    }
    
    // Отображаем каждый товар в корзине
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="cart-item-price">${item.price.toLocaleString()} ₽</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Добавляем обработчики событий
    addCartEventListeners();
    
    // Обновляем итоговую информацию
    updateCartSummary();
}

// Обновляем итоговую информацию
function updateCartSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = `${totalPrice.toLocaleString()} ₽`;
    
    // Активируем/деактивируем кнопку оформления
    checkoutBtn.disabled = cart.length === 0;
    
    // Обновляем счетчик в шапке
    updateCartCounter();
}

// Добавляем обработчики событий для элементов корзины
function addCartEventListeners() {
    // Увеличение количества
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            item.quantity += 1;
            saveCart();
            renderCart();
        });
    });
    
    // Уменьшение количества
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
            
            saveCart();
            renderCart();
        });
    });
    
    // Ручное изменение количества
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            const newQuantity = parseInt(this.value) || 1;
            
            if (newQuantity > 0) {
                item.quantity = newQuantity;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
            
            saveCart();
            renderCart();
        });
    });
    
    // Удаление товара
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== id);
            saveCart();
            renderCart();
        });
    });
}

// Сохраняем корзину в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

// Обновляем счетчик товаров в шапке
function updateCartCounter() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
}

// Оформление заказа
checkoutBtn.addEventListener('click', function() {
    alert('Заказ оформлен! Спасибо за покупку!');
    cart = [];
    saveCart();
    renderCart();
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', renderCart);