const cartRemoveAll = document.getElementsByClassName("cart_remove_all")[0];
cartRemoveAll.addEventListener("click", clearCart);
let count = 0;

//Populating cart from LS
(function initCart() {
	for (let i = 0; i < localStorage.length; i++) {
    //Getting item from ls, with key(length of storage)
    const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
    //Creating cartelement
    createProductElement(item);
    //Pushing to global cart array
    cartItems.push(item);
  }
  //Updating cart info
  cartCount(cartItems);
	calculateTotalCartSum(cartItems);
  })();
  
//creating product cart element
function createProductElement(productData) {
   //Create the structure of the cart HTML
   const cartList = document.getElementsByClassName("cart_list_container")[0];

   const cartItemContainer = document.createElement("article");
   cartItemContainer.classList.add("cart_product_container");
   cartItemContainer.id = `cart_product_container_${productData.artNr}`;

   let itemHTML = `
   <img src="${productData.imageSrc}" class="cart_product_image" width="100px" height="100px">
   <div class="cart_productinfo_container">
     <h5 class="cart_product_name">${productData.name}</h5>
     <p class="cart_product_artNr_text">ArtNr:&nbsp;</p>
     <p class="cart_product_artNr">${productData.artNr}</p>
     <input type="number" class="cart_product_quantity" min="1" value="${productData.quantity}">
     <p class="cart_product_price">à&nbsp;&nbsp;&nbsp;$${productData.price}</p>
     <div data-id="${productData.id}" class="cart_product_remove">
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
   //cartItems.push(item);
    animateAddProduct();

    
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
    const id = event.target.dataset.id;
    const productIndex = cartItems.indexOf(
      cartItems.find(item => item.artNr === artNr)
    );
    cartItems.splice(productIndex, 1);
    console.log(productIndex);

    //animate removal of cart item and removes cart item HTML from DOM
    animateRemoveFromCart(artNr);
    calculateTotalCartSum(cartItems);
    cartCount(cartItems);
    localStorage.removeItem(`item_${id}`);
  }
}

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

    //Creating product html in cart 
    createProductElement(clickedItem);
    //Saves selected product to localstorage
    localStorage.setItem(`item_${clickedItem.id}`, JSON.stringify(clickedItem));
  }
}

function clearCart() {
  //Select all products in cart and removes them with an animation
  animateClearCart();

  //Remove all items in cart array
  cartItems.splice(0, cartItems.length);

  cartCount(cartItems);
  calculateTotalCartSum(cartItems);
  localStorage.clear();
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

function cartCount(items) {
  let count = 0;
  for (let i = 0; i < items.length; i++) {
    count++; 
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

function animateAddProduct() {
  $(function() {
    $("#cart-link")
      .css({ position: "relative" })
      .animate(
        {
          width: "+=20",
          height: "+=20px",
          top: "-=10px",
          right: "-=10px"
        },
        100
      )
      .animate(
        {
          width: "-=20",
          height: "-=20px",
          top: "+=10px",
          right: "+=10px"
        },
        100
      );
  });
}

function animateRemoveFromCart(artNr) {
  $(function() {
    $(`#cart_product_container_${artNr}`).slideUp(200, function() {
      $(this).remove();
    });
  });
}

function animateClearCart() {
  $(function() {
    $(`.cart_product_container`).slideUp(300, function() {
      $(this).remove();
    });
  });
}
