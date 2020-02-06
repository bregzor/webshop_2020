
const cartRemoveAll = document.getElementsByClassName("cart_remove_all")[0];
cartRemoveAll.addEventListener("click", clearCart);

function addItemToCart(e, id) {
	//Pushing selected item to cartItem array (Fortsätt på detta David?)
	//Next step is to append html in cart based on result below
	cartItems.push(allItems.find(item => item.id === id));
  
	//Find the correct item in the cartItem array
	const clickedItem = cartItems.find(item => item.id === id);
  
	//Quantity now gets added to the cart array when product gets placed in cart
	const quantity = e.target.previousSibling.previousSibling.value;
	clickedItem.quantity = quantity;
  
	//Create the structure of the cart HTML
	const cartList = document.getElementsByClassName("cart_list_container")[0];
  
	const cartItemContainer = document.createElement("article");
	cartItemContainer.classList.add("cart_product_container");
  
	const cartItemLine = document.createElement("hr");
	cartItemLine.classList.add("cart-line");
  
	let itemHTML = `
	  <img src="${clickedItem.imageSrc}" class="cart_product_image" width="100px" height="100px">
	  <div class="cart_productinfo_container">
	  <h5 class="cart_product_name">${clickedItem.name}</h5>
	  <p class="cart_product_artNr">${clickedItem.artNr}</p>
		  <input type="number" class="cart_product_quantity" min="1" value="${clickedItem.quantity}">
	  <p class="cart_product_price">${clickedItem.price}</p>
	  <button class="cart_product_remove">
	</div>
	  `;
  
	//Inserting the cart HTML into the cart
	cartItemContainer.innerHTML = itemHTML;
	cartList.appendChild(cartItemContainer);
	cartList.appendChild(cartItemLine);
  
	//Add event listener to the remove button for each item placed in cart.
	cartItemContainer
	  .getElementsByClassName("cart_product_remove")[0]
	  .addEventListener("click", removeItemFromCart);
  
	//Event listener to change quantity in cart
	cartItemContainer
	  .getElementsByClassName("cart_product_quantity")[0]
	  .addEventListener("change", cartItemQuantityChange);
	  //Add event listener to the remove button for each item placed in cart.
	  cartItemContainer
		  .getElementsByClassName("cart_product_remove")[0]
		  .addEventListener("click", removeItemFromCart);
  
	  //Updating menu count
	  const cartLinkCount = document.getElementById("cart-link");
	  cartLinkCount.innerText = `CART(${addCount++})`;
  }
  
function cartItemQuantityChange(event) {
	const change = event.target;
	const artNr = change.parentElement.children[1].innerHTML;
  
	const product = cartItems.find(item => item.artNr === artNr);
	const productIndex = cartItems.indexOf(product);
  
	cartItems[productIndex].quantity = change.value;
	document.querySelector('#checkOut').innerText = `Checkout Total: ${calculateTotalCartSum(cartItems)}`;
  }
  
function removeItemFromCart(event) {
	const remove = event.target;
  
	const artNr = remove.parentElement.children[1].innerHTML;
	console.log(artNr);
  
	const product = cartItems.find(item => item.artNr === artNr);
	const productIndex = cartItems.indexOf(product);
	console.log(product);
	console.log(productIndex);
	cartItems.splice(productIndex, 1);
	console.log(cartItems);
  
	//Removes the product and the product separator line from the HTML
	remove.parentElement.parentElement.nextSibling.remove();
	remove.parentElement.parentElement.remove();
  }
  
function clearCart() {
	//Select the container for the cart products and removes all children
	const cartList = document.getElementsByClassName("cart_list_container")[0];
	while (cartList.firstChild) {
	  cartList.firstChild.remove();
	}
  }

function calculateTotalCartSum(arr) {
	let totalSum = 0;
	//Adding value by using foreach, possible with reduce method aswell
	arr.forEach(item => {totalSum = totalSum + parseInt(item.price) * parseInt(item.quantity);});
	return totalSum;
}

function openCart() {
	cart.style.width = "400px";
}

function closeCart() {
	cart.style.width = "0";
}
