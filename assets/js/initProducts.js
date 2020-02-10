"use strict";

const productSection = document.getElementById("products-container");
const cart = document.querySelector("#cart");
const allItems = [];
const cartItems = [];
let addCount = 1;

(function loadProducts() {
  //get json from serv
  fetch("./assets/js/products.json")
    //converting to js object
    .then(data => data.json())
    //drawing products based on previous promise
    .then(products => {
      let productHtml = "";
      //Submitting each article with data from js object
      products.forEach(item => {
        //increments html
        productHtml += `
				<article class="products__item">
					<img class="products__item-img" src='${item.imageSrc}' width="230" alt=''>
					<div class="products__item-info">
						<h4>${item.name}</h4>
						<p class="products__item-info-price">$${item.price}</p>
					</div>
					<div class="products__item-info-bottom">
						<p>ART-NR: ${item.artNr}</p>
						<label>QT</label><input type="number" id="pr_input" class="products-quantity-input" min="1" value="1">
						<a href="javascript:void(0)" class="btn" data-item="${item.id}">ADD</a>
					</div>
				</article>`;
        //updating html content and pushing all items to new array
        productSection.innerHTML = productHtml;
        imgToCartAnimate();
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
})();