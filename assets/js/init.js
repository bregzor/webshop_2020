"use strict";

const productSection = document.getElementById('products-container');
const allItems = [];
const cartItems = [];
const cart = document.querySelector("#cart");
loadProducts();

function loadProducts() {
	//get json from serv
	fetch('./assets/js/products.json')
		//converting to js object
		.then((data) => data.json())
		//drawing products based on previous promise
		.then((products) => {
			let productHtml = "";
			//Submitting each article with data from js object
			products.forEach(function (item) {
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
				btn.addEventListener("click", () => {
					const prodID = event.target.dataset.item;
					addItemToCart(prodID)
				});
			}
		})
		.catch((err) => console.log('Error in Fetch: ' + err));
}


function addItemToCart(id) {
	//Pushing selected item to cartItem array (Fortsätt på detta David?)
	//Next step is to append html in cart based on result below
	cartItems.push(allItems.find(item => item.id === id));
	console.log(cartItems);
}

function removeItemFromCart() {}


function openCart() {
	cart.style.width = "400px";
}

function closeCart() {
	cart.style.width = "0";
}
