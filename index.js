import { getAllProducts } from "./api/products.js";
import { mapProductToCard } from "./utils/layout.js";

document.addEventListener("DOMContentLoaded", displayAllProducts);
const mainContainer = document.querySelector(".main");

async function displayAllProducts() {
  const products = await getAllProducts();
  mainContainer.innerHTML = products.map(mapProductToCard).join(" ");

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const price = button.getAttribute("data-price");
      const name = button.getAttribute("data-name");
      const imageUrl = button.getAttribute("data-image");
      const stockQuantity = button.getAttribute("data-stockQuantity");

      let cart = JSON.parse(localStorage.getItem("cart")) || {};
      if (cart[productId]) {
        cart[productId].quantity += 1;
      } else {
        cart[productId] = {
          quantity: 1,
          price: price,
          name: name,
          imageUrl: imageUrl,
          stocQuantity: stocQuantity,
        };
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}
// Functie pentru a actualiza numarul de produse din cos
function updateCartCount() {
  // Obține numărul de produse din localStorage (sau dintr-o altă sursă)
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const cartCount = Object.values(cart).reduce(
    (total, product) => total + product.quantity,
    0
  );

  // Găsește elementul cu numărul de produse
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// Apelează funcția pentru a actualiza numărul de produse la încărcarea paginii
window.addEventListener("DOMContentLoaded", updateCartCount);

// Exemplu de actualizare a numărului de produse când se adaugă un produs în coș
function addToCart(productId, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (cart[productId]) {
    cart[productId].quantity += quantity;
  } else {
    cart[productId] = { quantity };
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  // Actualizează numărul de produse
  updateCartCount();
}

const products = [
  {
    name: "Smartphone Samsung Galaxy S21",
    category: "smartphone",
    price: 3200,
  },
  { name: "Smartphone iPhone 13", category: "smartphone", price: 4500 },
  { name: "Laptop Dell XPS 13", category: "laptop", price: 6800 },

  { name: "Televizor Samsung 55Q80A", category: "televizor", price: 7200 },
  {
    name: "Televizor Philips 70PUS8535",
    category: "televizor",
    price: 5800,
  },
  { name: "Televizor LG OLED55CX3", category: "televizor", price: 6500 },
  { name: "Smartphone Google Pixel 6", category: "smartphone", price: 4000 },
  {
    name: "Laptop Lenovo ThinkPad X1 Carbon",
    category: "laptop",
    price: 7800,
  },
  {
    name: "Televizor Sony Bravia 65X90J",
    category: "televizor",
    price: 7200,
  },
  {
    name: "Smartphone OnePlus 9",
    category: "smartphone",
    price: 3300,
  },
  {
    name: "Laptop HP Spectre x360",
    category: "laptop",
    price: 8200,
  },

  {
    name: "Televizor Philips LED 43PUS7009",
    category: "televizor",
    price: 5000,
  },
];

// Function to display products
function displayProducts(category) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear previous products

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  filteredProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: ${product.price}    lei</p>
        `;
    productList.appendChild(productDiv);
  });
}

// Event listener for category change
document.getElementById("category").addEventListener("change", (e) => {
  displayProducts(e.target.value);
});

// Display products on page load
displayProducts(document.getElementById("category").value);
