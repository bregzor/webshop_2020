"use strict";

const productSection = document.getElementById("products-container");
const allItems = [];
const cartItems = [];
const cart = document.querySelector("#cart");
const cartRemoveAll = document.getElementsByClassName("cart_remove_all")[0];
cartRemoveAll.addEventListener("click", clearCart);
loadProducts();

function loadProducts() {
  //get json from serv
  fetch("./assets/js/products.json")
    //converting to js object
    .then(data => data.json())
    //drawing products based on previous promise
    .then(products => {
      let productHtml = "";
      //Submitting each article with data from js object
      products.forEach(function(item) {
        //increments html
        productHtml += `
				<article class="products__item">
					<img class="products__item-img" src='${item.imageSrc}' width="230" alt=''>
					<div class="products__item-info">
						<h3>${item.name}</h3>
						<p>${item.price}</p>
					</div>
					<div class="products__item-info-bottom">
            <p>${item.artNr}</p>
            <input type="number" class="products-quantity-input" min="1" value="1">
						<a href="#" class="btn" data-item="${item.id}">ADD</a>
					</div>
				</article>`;
        //updating html content and pushing all items to new array
        productSection.innerHTML = productHtml;
        allItems.push(item);
      });

      //Adding listener to all add buttons,  sending in ID to determine which product through addtoCart()
      const btns = document.querySelectorAll(`.btn`);
      for (let i = 0; i < btns.length; i++) {
        const btn = btns[i];
        btn.addEventListener("click", e => {
          const prodID = event.target.dataset.item;
          addItemToCart(e, prodID);
        });
      }
    })
    .catch(err => console.log("Error in Fetch: " + err));
}

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
}

function cartItemQuantityChange(event) {
  const change = event.target;
  const artNr = change.parentElement.children[1].innerHTML;

  const product = cartItems.find(item => item.artNr === artNr);
  const productIndex = cartItems.indexOf(product);

  cartItems[productIndex].quantity = change.value;
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

//Add item to local storage
function checkOutAddItemtoStorage(itemsArr) {
  //Each item in arr
  let count = 0;
  itemsArr.forEach(item => {
    //making object to string (for localstorage to read)
    const item_serialized = JSON.stringify(item);
    //adding to storage
    localStorage.setItem(`item_${count++}`, item_serialized);
  });

  console.log(localStorage);

  getItemsFromStorage();
}

//Loop through localstorage and gets each item as js object
//For each iteration should add html content to page
function getItemsFromStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const storageItem = JSON.parse(localStorage.getItem(`item_${i}`));
    populateConfirmedItem(storageItem);
  }
  //populateConfirmedItems(storageItems);
}

function populateConfirmedItem(confirmedItem) {
  const orderArea = document.querySelector("#confirmed-orders");
  orderArea.innerHTML += JSON.stringify(confirmedItem);
}

const chkOutBtn = document.querySelector("#checkOut");
chkOutBtn.addEventListener("click", () => {
  checkOutAddItemtoStorage(cartItems);
});

function openCart() {
  cart.style.width = "400px";
}

function closeCart() {
  cart.style.width = "0";
}
