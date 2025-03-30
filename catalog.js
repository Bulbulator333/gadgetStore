const catalogProducts = [
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


const catalogContainer = document.getElementById('catalog-container');
const categoryFilters = document.querySelectorAll('input[name="category"]');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');

// Отображение товаров в каталоге
function renderCatalog(products) {
    catalogContainer.innerHTML = '';
    
    if (products.length === 0) {
        catalogContainer.innerHTML = '<p class="no-products">Товары не найдены</p>';
        return;
    }
    
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
        catalogContainer.appendChild(productCard);
    });

    // Добавляем обработчики для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Фильтрация товаров
function filterProducts() {
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    const maxPrice = parseInt(priceFilter.value);
    
    let filteredProducts = catalogProducts;
    

    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }
    

    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    renderCatalog(filteredProducts);
}

categoryFilters.forEach(filter => {
    filter.addEventListener('change', filterProducts);
});

priceFilter.addEventListener('input', function() {
    priceValue.textContent = `До ${parseInt(this.value).toLocaleString()} ₽`;
    filterProducts();
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
 
    renderCatalog(catalogProducts);
    
    priceValue.textContent = `До ${parseInt(priceFilter.value).toLocaleString()} ₽`;
});



// Функция добавления в корзину (такая же, как на главной)
function addToCart(e) {

    const productId = parseInt(e.target.getAttribute('data-id'));
    
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            ...product,
            quantity: 1
        });
    }
    

    localStorage.setItem('cart', JSON.stringify(cart));
    

    updateCartCounter();
    
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
