//Loop through localstorage and gets each item as js object
//For each iteration should add html content to page
(function getItemsFromStorage() {
	for (let i = 0; i < localStorage.length; i++) {
		const storageItem = JSON.parse(localStorage.getItem(`item_${i}`));
		populateConfirmedItem(storageItem);
	}
	localStorage.clear();
})();

function populateConfirmedItem(confirmedItem) {
	const orderArea = document.querySelector("#confirmed-orders");
	console.log(confirmedItem.name);
	orderArea.innerHTML += `
            <div class="orders__item">
                <div class="orders__item-image">
                    <img src="${confirmedItem.imageSrc}" alt="">
                </div>
                <div class="orders__item-info"">
                    <h3>${confirmedItem.name}</h3>
                    <span>${confirmedItem.artNr}</span>
                </div>
                <div class="orders__item-right">
                    <span>${confirmedItem.quantity}</span>
                    <h4>${confirmedItem.price}</h4>
                </div>
            </div>
	`;
};
