document.addEventListener("DOMContentLoaded", showProductDetails);

const url = "https://66b9fd34fa763ff550fa63a0.mockapi.io/products";

async function showProductDetails() {
  const urlSearchParam = new URLSearchParams(window.location.search);
  const productId = urlSearchParam.get("id");

  const response = await fetch(`${url}/${productId}`);
  const product = await response.json();

  document.querySelector(".main").innerHTML = `
    <table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
        <tr>
            <th>Nume Produs</th>
            <th>Detalii</th>
            <th>Pret</th>
            <th>Stoc</th>
            <th>Imagine</th>
        </tr>
        <tr>
            <td>${product.name}</td>
            <td>${product.details}</td>
            <td>${product.price}</td>
            <td>${product.stockQuantity}</td>
            
            <td><img src="../${product.imageUrl}" width="50px" /></td>
        </tr>
    </table>`;
}
