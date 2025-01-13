// Define API URL (adjust according to your backend)
const API_URL = 'http://localhost:5001/api/products'; // Make sure this is the correct URL

// Function to fetch and display all products
function fetchAndDisplayProducts() {
    fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((products) => {
            const tableBody = document.querySelector('#productTableBody');
            tableBody.innerHTML = products
                .map((product) => {
                    return `
            <tr data-product-id="${product.pid}">
              <td>${product.pid}</td>
              <td>${product.name}</td>
              <td><img src="${product.image}" alt="${product.name}" style="max-width: 100px;"/></td>
              <td>Rs.${product.price}</td>
              <td>${product.description}</td>
              <td>
                <button class="edit-btn" onclick="editProduct('${product.pid}')">Edit</button>
                <button class="remove-btn" onclick="removeProduct('${product.pid}')">Remove</button>
              </td>
            </tr>
          `;
                })
                .join('');
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
}

// Function to handle form submission to add a new product
function addProduct(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const productForm = document.getElementById('productForm');
    const formData = new FormData(productForm);

    // Prepare the data object
    const productData = {
        pid: formData.get('pid'),
        name: formData.get('name'),
        image: formData.get('image').name, // Assuming image is uploaded correctly
        price: formData.get('price'),
        description: formData.get('description')
    };

    // Send POST request to add the product
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            // After successful submission, refresh the product list
            fetchAndDisplayProducts();
            productForm.reset(); // Reset the form
        })
        .catch((error) => {
            console.error('Error adding product:', error);
        });
}

// Function to handle product removal
function removeProduct(pid) {
    fetch(`${API_URL}/delete/${pid}`, { method: 'DELETE' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            fetchAndDisplayProducts(); // Refresh product list after deletion
        })
        .catch((error) => {
            console.error('Error removing product:', error);
        });
}

// Function to handle editing the product (optional for future functionality)
function editProduct(pid) {
    // You can add logic here to populate the form with product data for editing
    alert(`Edit product with PID: ${pid}`);
}

// Set up the event listener for the form submission
document.getElementById('productForm').addEventListener('submit', addProduct);

// Initial fetch to display products on page load
fetchAndDisplayProducts();
