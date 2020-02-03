"use strict";

const productSection = document.getElementById('product-section');

fetch('./assets/js/products.json')
.then((res) => res.json())
.then((products) => {
	let productHtml = "";
	products.forEach(function(item) {
		productHtml += `
		<article class="products__item">
			<img class="products__item-img" src='${item.imageSrc}' width="230" alt=''>
			<div class="products__item-info">
				<h3>${item.name}</h3>
				<p>${item.price}</p>
			</div>
			<div class="products__item-info-bottom">
				<p>${item.artNr}</p>
				<span id="addToCart">+</span>
			</div>
		</article>`;
			productSection.innerHTML = productHtml;
	});

})
.catch((err) => console.log('Error in Fetch: ' + err))

