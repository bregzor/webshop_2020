const cartRemoveAll = document.getElementsByClassName("cart_remove_all")[0];
cartRemoveAll.addEventListener("click", clearCart);

function addItemToCart(e, id) {
  //Check if the product is already in the shopping cart
  if (cartItems.find(item => item.id === id)) {
    alert("You already have this product in your shopping cart!");
  } else {
    //Pushing selected item to cartItem array
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

    let itemHTML = `
	  <img src="${clickedItem.imageSrc}" class="cart_product_image" width="100px" height="100px">
	  <div class="cart_productinfo_container">
      <h5 class="cart_product_name">${clickedItem.name}</h5>
      <p class="cart_product_artNr_text">ArtNr:&nbsp;</p>
      <p class="cart_product_artNr">${clickedItem.artNr}</p>
      <input type="number" class="cart_product_quantity" min="1" value="${clickedItem.quantity}">
      <p class="cart_product_price">à&nbsp;&nbsp;&nbsp;$${clickedItem.price}</p>
	    <div class="cart_product_remove">
	  </div>
	  `;

    //Inserting the cart HTML into the cart
    cartItemContainer.innerHTML = itemHTML;
    cartList.appendChild(cartItemContainer);

    //Add event listener to the remove button for each item placed in cart.
    cartItemContainer
      .getElementsByClassName("cart_product_remove")[0]
      .addEventListener("click", removeItemFromCart);

    //Event listener to change quantity in cart
    cartItemContainer
      .getElementsByClassName("cart_product_quantity")[0]
      .addEventListener("change", cartItemQuantityChange);

    cartCount(cartItems);
    calculateTotalCartSum(cartItems);
  }

  function cartItemQuantityChange(event) {
    //Find the index of the item beeing changed
    const artNr = event.target.parentElement.children[2].innerHTML;
    const productIndex = cartItems.indexOf(
      cartItems.find(item => item.artNr === artNr)
    );

    //Change the quantity of the item in cart array
    cartItems[productIndex].quantity = event.target.value;

    calculateTotalCartSum(cartItems);
    cartCount(cartItems);
  }

  function removeItemFromCart(event) {
    //Find the clicked item in cart array and remove it
    const artNr = event.target.parentElement.children[2].innerHTML;
    const productIndex = cartItems.indexOf(
      cartItems.find(item => item.artNr === artNr)
    );
    cartItems.splice(productIndex, 1);
    //Removes the product and the product separator line from the HTML
    event.target.parentElement.parentElement.remove();

    calculateTotalCartSum(cartItems);
    cartCount(cartItems);
  }
}

function clearCart() {
  //Select the container for the cart products and removes all children
  const cartList = document.getElementsByClassName("cart_list_container")[0];
  while (cartList.firstChild) {
    cartList.firstChild.remove();
  }

  //Remove all items in cart array
  cartItems.splice(0, cartItems.length);

  cartCount(cartItems);
  calculateTotalCartSum(cartItems);
}

function calculateTotalCartSum(arr) {
  let totalSum = 0;
  //Adding value by using foreach, possible with reduce method aswell
  arr.forEach(item => {
    totalSum = totalSum + parseInt(item.price) * parseInt(item.quantity);
  });
  console.log(totalSum);
  document.querySelector(
    "#checkOut"
  ).innerText = `Checkout Total: $${totalSum}`;
}

//Updating menu count
function cartCount(cartCount) {
  let count = 0;
  for (let i = 0; i < cartCount.length; i++) {
    count += parseInt(cartCount[i].quantity);
  }
  const cartLinkCount = document.getElementById("cart-count");
  cartLinkCount.innerText = `(${count})`;
}

function openCart() {
  cart.style.width = "400px";
}

function closeCart() {
  cart.style.width = "0";
}
