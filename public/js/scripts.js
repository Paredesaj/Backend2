const socket = io();

// Función para manejar la eliminación de productos
function deleteProduct(productId) {
    fetch(`/api/products/${productId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto eliminado:', data);
    })
    .catch(error => {
        console.error('Error al eliminar producto:', error);
    });
}

// Función para agregar un nuevo producto
const form = document.getElementById('add-product-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newProduct = {
        title: document.getElementById('title').value,
        code: document.getElementById('code').value,
        price: document.getElementById('price').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
        thumbnail: document.getElementById('thumbnail').value,
    };

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto agregado:', data);
        // Actualizar la lista de productos con la nueva información
        socket.emit('newProduct', data);
    })
    .catch(error => {
        console.error('Error al agregar producto:', error);
    });
});

// Escuchar eventos de WebSocket
socket.on('productAdded', (product) => {
    const productList = document.getElementById('product-list');
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.id = `product-${product.id}`;

    productCard.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Precio: $${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <button class="btn btn-delete" onclick="deleteProduct('${product.id}')">Eliminar</button>
    `;

    productList.appendChild(productCard);
});

socket.on('productDeleted', (productId) => {
    const productCard = document.getElementById(`product-${productId}`);
    if (productCard) {
        productCard.remove();
    }
});
