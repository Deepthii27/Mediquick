// const PRODUCT_API = "./ProductsList.json"
const PRODUCT_API = "https://mediquick-n6tp.onrender.com/api/products/pid"

const getProductID = () => {
    const UrlParams = new URLSearchParams(window.location.search)
    const ID = UrlParams.get("pid")
    return ID
}

const fetchProducts = async (ProductID) => {
    try {
        const res = await fetch(PRODUCT_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pid: ProductID })
        })
        const data = await res.json()

        return data
    } catch (err) {
        console.error("ProductFetchErr:", err)
    }
}

const ProductID = getProductID()
const ProductInfo = await fetchProducts(ProductID)
console.log({ ProductID, ProductInfo })

const ProductTitle = document.getElementById("productTitle")
const ProductDescription = document.getElementById("productDescription")
const ProductImage = document.getElementById("productImage")
const ProductPrice = document.getElementById("productPrice")

ProductTitle.textContent = ProductInfo.name
ProductImage.src = ProductInfo.image
ProductPrice.textContent = `Rs. ${ProductInfo.price}.00`
ProductDescription.textContent = ProductInfo.description


// Adding to Cart
const addToCart = () => {
    let currentCart = [];

    try {
        // Attempt to parse the current cart from localStorage
        currentCart = JSON.parse(localStorage.getItem("mediquick_cart"));

        // If the parsed result isn't an array, reset to an empty array
        if (!Array.isArray(currentCart)) {
            currentCart = [];
        }
    } catch (error) {
        console.error("Error parsing cart data:", error);
        // If parsing fails, reset the cart to an empty array
        currentCart = [];
    }

    // Add the current product to the cart
    const updatedCart = [...currentCart, ProductInfo];

    // Save the updated cart back to localStorage
    localStorage.setItem("mediquick_cart", JSON.stringify(updatedCart));

    console.log("Updated Cart:", updatedCart);
    window.location.replace("cart.html");
};
window.addToCart = addToCart;
