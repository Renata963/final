document.addEventListener("DOMContentLoaded", showProductDetails);

const url = "https://66b9fd34fa763ff550fa63a0.mockapi.io/products";

async function showProductDetails() {
  const urlSearchParam = new URLSearchParams(window.location.search);
  const productId = urlSearchParam.get("id");

  const response = await fetch(`${url}/${productId}`);
  const product = await response.json();

  document.querySelector(".main").innerHTML = `
    <table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
     <colgroup>
        <col style="width: 20%;">
        <col style="width: 30%;">
        <col style="width: 15%;">
        <col style="width: 10%;">
        <col style="width: 15%;">
        <col style="width: 10%;">
    </colgroup>
        <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Price</th>
            <th>Stoc</th>
            <th>Image</th>
            <th><i class="fa-solid fa-check"></i></th>
            
        </tr>
        <tr>
            <td>${product.name}</td>
            <td>${product.details}</td>
            <td>${product.price}</td>
            <td>${product.stockQuantity}
            
            <td><img src="../${product.imageUrl}" width="50px" /></td>
      
            <td><button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.imageUrl}" data-stockQuantity="${product.stockQuantity}">Add to cart</button>
        </tr>
    </table>`;
}

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
