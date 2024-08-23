import { getProductById } from "../api/products.js";

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalContainer = document.querySelector(".cart-total");

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    for (let id in cart) {
      const product = cart[id];
      const stocQuantity = product.stocQuantity;

      const productCard = document.createElement("div");
      productCard.className =
        "flex justify-between items-center w-500 border-bottom";

      const decreaseDisabled = product.quantity === 1 ? "disabled" : "";
      productCard.innerHTML = `
        <img width="100px" src="../${product.imageUrl}" />
        <div class="w-100 h-100 flex gap-50 justify-between items-center">
          <span style="font-size: 20px; font-style:italic;">${
            product.name
          }</span>
          <div>
            <button data-id="${id}" ${decreaseDisabled} class="decrease">-</button>
            <span>${product.quantity}</span>
            <button data-id="${id}" class="increase">+</button>
          </div>
        </div>
        <span style="font-size: 20px; font-style:italic;">${
          product.price * product.quantity
        } lei</span>
        <button data-id="${id}" class="delete" style="font-size: 20px; margin:20px;">Delete</button>
      `;
      total += product.price * product.quantity;
      cartItemsContainer.appendChild(productCard);
    }
    cartTotalContainer.innerHTML =
      total === 0 ? "Cosul de cumpărături este gol" : `Total: ${total} lei`;
  }

  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase")) {
      const id = e.target.getAttribute("data-id");
      cart[id].quantity += 1;
    } else if (e.target.classList.contains("decrease")) {
      const id = e.target.getAttribute("data-id");
      cart[id].quantity -= 1;
    } else if (e.target.classList.contains("delete")) {
      const id = e.target.getAttribute("data-id");
      delete cart[id];
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  });

  updateCart();
});

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
