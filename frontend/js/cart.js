// Get the cart items from localStorage or initialize an empty array
let currentCart = JSON.parse(localStorage.getItem("mediquick_cart")) || [];
const cartTableBody = document.getElementById("cartTableBody");
const cartTotalElement = document.getElementById("cartTotal");

// Function to load the cart and render items
const loadCart = () => {
    let cartTotal = 0;
    cartTableBody.innerHTML = "";

    if (currentCart.length === 0) {
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">Your cart is empty!</td>
            </tr>
        `;
        cartTotalElement.textContent = "0.00";
        return;
    }

    currentCart.forEach((item, index) => {
        // Initialize quantity to 1 if not set yet
        if (!item.quantity) {
            item.quantity = 1;
        }

        // Calculate the item total
        const itemTotal = item.price * item.quantity;
        cartTotal += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover;"></td>
            <td style="color:black">${item.name}</td>
            <td style="color:black">Rs. ${item.price.toFixed(2)}</td>
            <td>
                <div class="d-flex justify-content-center align-items-center">
                    <button class="btn btn-sm btn-primary" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="text" class="form-control quantity-input mx-2" value="${item.quantity}" readonly>
                    <button class="btn btn-sm btn-primary" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </td>
            <td style="color:black">Rs. ${itemTotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });

    cartTotalElement.textContent = cartTotal.toFixed(2);
};

// Function to update quantity
const updateQuantity = (index, change) => {
    let newQuantity = currentCart[index].quantity + change;
    if (newQuantity < 1) {
        newQuantity = 1; // Ensure quantity is never less than 1
    }

    currentCart[index].quantity = newQuantity;
    localStorage.setItem("mediquick_cart", JSON.stringify(currentCart));
    loadCart();
};

// Function to remove an item from the cart
const removeFromCart = (index) => {
    currentCart.splice(index, 1);
    localStorage.setItem("mediquick_cart", JSON.stringify(currentCart));
    loadCart();
};

// Function to clear the entire cart
const clearCart = () => {
    localStorage.removeItem("mediquick_cart");
    currentCart = [];
    loadCart();
};

// Attach event to proceed to checkout button
document.getElementById("proceedCheckout").addEventListener("click", () => {
    if (currentCart.length === 0) {
        alert("Your cart is empty. Please add some items to proceed.");
    } else {
        alert("Proceeding to checkout!");
        // Redirect to checkout page
        window.location.href = "./frontend/checkout.html";
    }
});

// Attach event to clear cart button
document.getElementById("clearCart").addEventListener("click", clearCart);

// Load the cart when the page loads
loadCart();
