import { getProductById } from "../api/products.js";

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalContainer = document.querySelector(".cart-total");
  displayAllProducts();
  updateCartCount(); // Actualizează numărul de produse la încărcarea paginii
  updateCart();
  showProductDetails(); // Actualizează coșul la încărcarea paginii
});

async function displayAllProducts() {
  const products = await getAllProducts();
  const mainContainer = document.querySelector(".main");
  mainContainer.innerHTML = products.map(mapProductToCard).join(" ");

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const price = button.getAttribute("data-price");
      const name = button.getAttribute("data-name");
      const imageUrl = button.getAttribute("data-image");

      let cart = JSON.parse(localStorage.getItem("cart")) || {};
      if (cart[productId]) {
        cart[productId].quantity += 1;
      } else {
        cart[productId] = {
          quantity: 1,
          price: price,
          name: name,
          imageUrl: imageUrl,
        };
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();
    });
  });
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const cartCount = Object.values(cart).reduce(
    (total, product) => total + product.quantity,
    0
  );

  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

function addToCart(productId, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  getProductById(productId).then((productDetails) => {
    if (!productDetails) return; // Dacă produsul nu există, ieșim din funcție

    const { stocQuantity, price, name, imageUrl } = productDetails;

    if (cart[productId]) {
      // Dacă produsul este deja în coș
      if (cart[productId].quantity + quantity > stocQuantity) {
        alert("Not enough stock available!");
        return;
      }
      cart[productId].quantity += quantity;
    } else {
      // Dacă produsul nu este în coș
      if (quantity > stocQuantity) {
        alert("Not enough stock available!");
        return;
      }
      cart[productId] = {
        quantity: quantity,
        price: price,
        name: name,
        imageUrl: imageUrl,
        stocQuantity: stocQuantity,
      };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateCart();
  });
}

function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalContainer = document.querySelector(".cart-total");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  for (let id in cart) {
    const product = cart[id];
    const stocQuantity = cart.stocQuantity;

    const productCard = document.createElement("div");
    productCard.className =
      "flex justify-between items-center w-500 border-bottom";

    const decreaseDisabled = product.quantity === 1 ? "disabled" : "";
    const increaseDisabled = product.quantity >= stocQuantity ? "disabled" : "";

    productCard.innerHTML = `
      <img width="100px" src="../${product.imageUrl}" />
      <div class="w-100 h-100 flex gap-50 justify-between items-center">
        <span style="font-size: 20px; font-style:italic;">
		<a href="details.html?id=${id}" style="text-decoration: none; color: inherit;">
            ${product.name}</a>
        <div>
          <button data-id="${id}" ${decreaseDisabled} class="decrease">-</button>
          <span>${product.quantity}</span>
          <button data-id="${id}" ${increaseDisabled} class="increase">+</button>
        </div>
      </div>
      <span style="font-size: 20px; font-style:italic;">${
        product.price * product.quantity
      } lei</span>
                 
               
      <button data-id="${id}" class="delete" style="font-size: 20px; margin:20px;">Delete</button>
    `;
    total = total + product.price * product.quantity;
    cartItemsContainer.appendChild(productCard);
  }

  cartTotalContainer.innerHTML =
    total === 0 ? "Cosul de cumpărături este gol" : `Total: ${total} lei`;

  cartItemsContainer.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");

    if (e.target.classList.contains("increase")) {
      if (cart[id].quantity < cart[id].stocQuantity) {
        cart[id].quantity += 1;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateCartCount();
  });
}
