import {
  getAllProducts,
  getProductById,
  deleteProduct,
  addNewProduct,
  updateProduct,
} from "../api/products.js";
import { mapProductToAdminTableRow } from "../utils/layout.js";

// Load products in table at page loading
const productsTableBody = document
  .getElementById("products-table")
  .querySelector("tbody");

document.addEventListener("DOMContentLoaded", () => {
  displayAllProducts();
  updateCartCount();
});

async function displayAllProducts() {
  const products = await getAllProducts();

  productsTableBody.innerHTML = products
    .map(mapProductToAdminTableRow)
    .join("");
}

// save new product
const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("image-url");
const detailsInput = document.getElementById("details");
const stockQuantityInput = document.getElementById("stockQuantity");
const saveProductButton = document.getElementById("save-btn");

let editMode = false;
let currentEditableProductId;

saveProductButton.addEventListener("click", saveProduct);

async function saveProduct(event) {
  event.preventDefault();

  const product = {
    name: nameInput.value,
    price: Number(priceInput.value),
    imageUrl: imageUrlInput.value,
    details: detailsInput.value,
    stockQuantity: Number(stockQuantityInput.value),
  };

  if (editMode) {
    const editedProduct = await updateProduct(
      product,
      currentEditableProductId
    );
    if (editedProduct !== null) {
      form.reset();
      displayAllProducts();
      editMode = false;
    }
  } else {
    const newProduct = await addNewProduct(product);
    if (newProduct !== null) {
      form.reset();
      displayAllProducts();
    }
  }
}
// edit product
productsTableBody.addEventListener("click", handleActions);

async function handleActions(event) {
  const className = event.target.parentElement.className;
  if (className.includes("edit")) {
    const productId = className.split("-")[1];
    editProduct(productId);
  } else if (className.includes("delete")) {
    const productId = className.split("-")[1];
    await deleteProduct(productId);
    await displayAllProducts();
  }
}

function editProduct(id) {
  getProductById(id).then((product) => {
    editMode = true;
    nameInput.value = product.name;
    priceInput.value = product.price;
    imageUrlInput.value = product.imageUrl;
    detailsInput.value = product.details;
    stockQuantityInput.value = product.stockQuantity;

    currentEditableProductId = product.id;
  });
}
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
