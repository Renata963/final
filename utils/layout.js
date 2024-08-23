export function mapProductToCard(product) {
  return `
				<div class="product-card flex-col gap-20 items-center justify-between">
					<h3 class="card-title">${product.name}</h3>
                
                  <img src=${product.imageUrl} width="150px"/>
               
					<p class="card-price">${product.price} lei</p>
               <p class="card-stocQuantity">${product.stockQuantity}</p>
               <a href="../pages/details.html?id=${product.id}">
                <button class="details">Details</button></a>
                 
               <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.imageUrl}" data-stockQuantity="${product.stockQuantity}">Adauga in cos</button>
				</div>
      		`;
}

export function mapProductToAdminTableRow(product) {
  return `
            <tr>
               <td>
               <a href="details.html?id=${product.id}" style="text-decoration: none; color: inherit;">
            ${product.name}
        </a></td>
               <td>${product.price}</td>
               
                              
               <td>
                     <img src="../${product.imageUrl}" width="50px" />
                  </a>
               </td>
               <td>
                  <button class="edit-${product.id}">
                     <i class="fa-solid fa-pen-to-square">
                     </i>
                  </button>
               </td>
                
               <td>
                  <button class="delete-${product.id}">
                     <i class="fa-solid fa-trash"></i>
                  </button>
               </td>
            
               <td>
                  ${product.stockQuantity}
      
               </td>
               
            </tr>
            `;
}
