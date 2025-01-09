// // const PRODUCT_API = "http://localhost:5000/api/products"

// // const fetchProducts = async () => {
// //     try {
// //         const res = await fetch(PRODUCT_API)
// //         const data = await res.json()
// //         return data
// //     } catch (err) {
// //         console.error("ProductFetchErr:", err)
// //     }
// // }

// // const ProductInfo = await fetchProducts()
// // const ProductContainer = document.getElementById("product-list")
// // let rows = ``

// // console.log({ ProductInfo })

// // ProductInfo && ProductInfo.forEach(item => {
// //     rows += `<div class="col-sm-6 col-lg-4 text-center item mb-4">
// //         <a href="product.html?pid=${item.pid}">
// //             <img src="${item.image}" alt="Image"/>
// //         </a>
// //         <h3 class="text-dark">
// //             <a href="product.html?pid=${item.pid}">${item.name}</a>
// //         </h3>
// //         <p class="price">Rs.${item.price}.00</p>
// //     </div>`
// // })

// // ProductContainer.innerHTML = rows

// const PRODUCT_API = "http://localhost:5000/api/products";

// const fetchProducts = async () => {
//     try {
//         const res = await fetch(PRODUCT_API);
//         const data = await res.json();
//         return data;
//     } catch (err) {
//         console.error("ProductFetchErr:", err);
//     }
// };

// const ProductInfo = await fetchProducts();
// const ProductContainer = document.getElementById("product-list");
// let rows = ``;

// console.log({ ProductInfo });

// // Render products
// const renderProducts = (products) => {
//     if (!products || products.length === 0) {
//         ProductContainer.innerHTML = `<p>No products to display.</p>`;
//         return;
//     }

//     const productHTML = products.map(item => `
//         <div class="col-sm-6 col-lg-4 text-center item mb-4">
//             <a href="product.html?pid=${item.pid}">
//                 <img src="${item.image}" alt="Image"/>
//             </a>
//             <h3 class="text-dark">
//                 <a href="product.html?pid=${item.pid}">${item.name}</a>
//             </h3>
//             <p class="price">Rs.${item.price}.00</p>
//         </div>`).join('');

//     ProductContainer.innerHTML = productHTML;
// };

// // Initial render
// renderProducts(ProductInfo);

// // Search functionality
// const searchProducts = () => {
//     const query = document.getElementById("search-input").value.toLowerCase();
//     const filteredProducts = ProductInfo.filter(product =>
//         product.name.toLowerCase().includes(query)
//     );

//     if (filteredProducts.length === 0) {
//         showProductNotFoundModal();
//     } else {
//         renderProducts(filteredProducts);
//     }
// };

// // Modal for "Product not found"
// const showProductNotFoundModal = () => {
//     const modal = document.createElement('div');
//     modal.classList.add('modal');
//     modal.innerHTML = `
//         <div class="modal-content">
//             <span class="close-btn" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
//             <p>Product not found</p>
//             <button onclick="this.parentElement.parentElement.style.display='none'">OK</button>
//         </div>
//     `;
//     document.body.appendChild(modal);
//     modal.style.display = "block";
// };

// // Attach search function to input
// document.getElementById("search-input").addEventListener("keyup", searchProducts);

const PRODUCT_API = "http://localhost:5000/api/products";

const fetchProducts = async () => {
    try {
        const res = await fetch(PRODUCT_API);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("ProductFetchErr:", err);
        showErrorPlaceholder("Failed to fetch products. Please try again later.");
    }
};

const ProductContainer = document.getElementById("product-list");

// Render products dynamically
const renderProducts = (products) => {
    if (!products || products.length === 0) {
        ProductContainer.innerHTML = `<p>No products to display.</p>`;
        return;
    }

    const productHTML = products
        .map(
            (item) => `
      <div class="col-sm-6 col-lg-4 text-center item mb-4">
        <div class="product-card">
          <a href="product.html?pid=${item.pid}">
            <img src="${item.image}" alt="${item.name}" class="product-img" loading="lazy" />
          </a>
          <div class="product-info">
            <h3 class="product-title">
              <a href="product.html?pid=${item.pid}">${item.name}</a>
            </h3>
            <p class="product-price" style="color:black">Rs. ${item.price}.00</p>
          </div>
        </div>
      </div>`
        )
        .join("");

    ProductContainer.innerHTML = productHTML;
};

// Handle errors with a placeholder
const showErrorPlaceholder = (message) => {
    ProductContainer.innerHTML = `<p class="error-placeholder">${message}</p>`;
};

// Initial product fetch and render
(async () => {
    const ProductInfo = await fetchProducts();
    renderProducts(ProductInfo);

    // Attach search functionality
    document
        .getElementById("search-input")
        .addEventListener("keyup", () => searchProducts(ProductInfo));
})();

// Search functionality
const searchProducts = (products) => {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query)
    );

    if (filteredProducts.length === 0) {
        showProductNotFoundModal();
    } else {
        renderProducts(filteredProducts);
    }
};

// Modal for "Product not found"
const showProductNotFoundModal = () => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
      <p>Product not found</p>
      <button class="ok-btn" onclick="this.parentElement.parentElement.style.display='none'">OK</button>
    </div>`;
    document.body.appendChild(modal);
    modal.style.display = "block";
};
