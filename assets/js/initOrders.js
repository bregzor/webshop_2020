//Loop through localstorage and gets each item as js object
//For each iteration should add html content to page
(function getItemsFromStorage() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const storageItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
        createOrderElement(storageItem);
        total = total + parseInt(storageItem.price) * parseInt(storageItem.quantity);
    }
    const totalEl = document.querySelector('.orders__bottom-sum-text');
    totalEl.innerText = `Total: $${total}`;
    localStorage.clear();
})();

function createOrderElement(confirmedItem) {
    const orderArea = document.querySelector("#confirmed-orders");
    orderArea.innerHTML += `
            <div class="orders__item">
                <div class="orders__item-image">
                    <img src="${confirmedItem.imageSrc}" alt="">
                </div>
                <div class="orders__item-info"">
                    <h3 class="orders__item-info-header">${confirmedItem.name}</h3>
                    <span>Art-nr: ${confirmedItem.artNr}</span>
                </div>
                <div class="orders__item-right">
                    <span>Units:${confirmedItem.quantity}</span>
                    <h4>${confirmedItem.price}€</h4>
                </div>
            </div>
    `;
};