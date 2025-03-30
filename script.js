const products = [
    {
        id: 1,
        name: "Смартфон ZXC Pro",
        price: 34990,
        category: "phones",
        image: "https://ipixel.ru/upload/iblock/8e1/f5m34p6920967zxqs9nhph3uih5yqbe1.jpg"
    },
    {
        id: 2,
        name: "Ноутбук Super",
        price: 65990,
        category: "laptops",
        image: "https://cdn.kns.ru/linkpics/huawei-matebook-d-16-53013yly_kod_863915-v1.jpg"
    },
    {
        id: 3,
        name: "Наушники Krutoi Zvuk",
        price: 12990,
        category: "headphones",
        image: "https://i-store.net/_sh/73/7328.jpg"
    },
    {
        id: 4,
        name: "Смартфон Tecno 10",
        price: 42990,
        category: "phones",
        image: "https://apple-nova.ru/files/item/77yw57gk0epjegf5o3fm9fss2takhc7a%20(1).jpg"
    },
    {
        id: 5,
        name: "Ноутбук Ultra",
        price: 78990,
        category: "laptops",
        image: "https://www.huawei-networks.ru/upload/iblock/104/1044ea67f32075d39ba34fc299845086.jpg"
    },
    {
        id: 6,
        name: "Наушники Picun f6",
        price: 18990,
        category: "headphones",
        image: "https://microless.com/cdn/products/54f30043b9eed8862dfa5d2576a93a5a-hi.jpg"
    }
];



// DOM элементы
const productContainer = document.getElementById('product-container');
const cartCounter = document.querySelector('.cart-counter');

// Отображение товаров
function renderProducts() {
    productContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString()} ₽</p>
                <button class="add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    // Добавляем обработчики для кнопок
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}


// Фильтрация по категориям
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        alert(`Фильтрация по категории: ${category} *перейдите в каталог*`);
    });
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});



// корзина
function addToCart(e) {
 
    const productId = parseInt(e.target.getAttribute('data-id'));
    
    // Находим товар в массиве
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Загружаем текущую корзину из LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1; // Увеличиваем количество
    } else {
        cart.push({ // Добавляем новый товар
            ...product,
            quantity: 1
        });
    }
    
    // Сохраняем обновлённую корзину
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем счётчик товаров в шапке
    updateCartCounter();
    
    // Анимация кнопки
    e.target.textContent = "Добавлено!";
    e.target.style.backgroundColor = "#28a745";
    setTimeout(() => {
        e.target.textContent = "В корзину";
        e.target.style.backgroundColor = "#4e54c8";
    }, 1000);
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-counter').forEach(counter => {
        counter.textContent = totalItems;
    });
}

const subscribeBtn = document.querySelector('.subscribe')
subscribeBtn.addEventListener('click', function() {
    alert('Спасибо за подписку!')
})


document.addEventListener('DOMContentLoaded', updateCartCounter);