const form = document.getElementById('productForm');
const productTableBody = document.getElementById('productTableBody');

const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const products = await res.json();
    productTableBody.innerHTML = '';
    products.forEach((product) => {
        const row = `
            <tr>
                <td>${product.pid}</td>
                <td>${product.name}</td>
                <td><img src="${product.image}" alt="${product.name}" width="50"/></td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>
                    <button onclick="deleteProduct('${product.pid}')">Remove</button>
                </td>
            </tr>
        `;
        productTableBody.innerHTML += row;
    });
};

const deleteProduct = async (pid) => {
    await fetch(`/api/products/${pid}`, { method: 'DELETE' });
    fetchProducts();
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    await fetch('/api/products', { method: 'POST', body: formData });
    fetchProducts();
    form.reset();
});

fetchProducts();
