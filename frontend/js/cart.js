let currentCart = [];
const cartTableBody = document.getElementById("cartTableBody");
const cartTotalElement = document.getElementById("cartTotal");

// Get logged-in user from localStorage
const loggedInUser = localStorage.getItem("loggedInUser");

if (!loggedInUser) {
    alert("Please log in first.");
    window.location.href = "login.html"; // Redirect to login if user is not logged in
}

// Fetch cart from the backend for the logged-in user
const fetchCart = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/cart/${loggedInUser}`, {
            method: 'GET',
        });
        const data = await response.json();
        if (response.ok) {
            currentCart = data.items || [];
            loadCart();
        } else {
            console.error('Failed to fetch cart:', data.message);
            loadCart();
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        loadCart();
    }
};

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
    saveCart(); // Save the updated cart to the backend
    loadCart();
};

// Function to remove an item from the cart
const removeFromCart = (index) => {
    currentCart.splice(index, 1);
    saveCart(); // Save the updated cart to the backend
    loadCart();
};

// Function to save the cart to the backend
const saveCart = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/cart/${loggedInUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: currentCart }),
        });
        if (response.ok) {
            console.log('Cart saved');
        } else {
            console.error('Failed to save cart');
        }
    } catch (error) {
        console.error('Error saving cart:', error);
    }
};

// Function to clear the entire cart
const clearCart = () => {
    currentCart = [];
    saveCart(); // Save the empty cart to the backend
    loadCart();
};

// Attach event to proceed to checkout button
document.getElementById("proceedCheckout").addEventListener("click", () => {
    if (currentCart.length === 0) {
        alert("Your cart is empty. Please add some items to proceed.");
    } else {
        alert("Proceeding to checkout!");
        // Redirect to checkout page
        window.location.href = "checkout.html";
    }
});

// Attach event to clear cart button
document.getElementById("clearCart").addEventListener("click", clearCart);

// Load the cart when the page loads
fetchCart();
