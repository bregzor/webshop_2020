const orderArea = document.querySelector("#confirmed-orders");

//Loop through localstorage and gets each item as js object
//For each iteration should add html content to page
    (function getItemsFromStorage() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const storageItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
            createOrderElement  (storageItem);
            total = total + parseInt(storageItem.price) * parseInt(storageItem.quantity);
        }
        const totalEl = document.querySelector('.orders__bottom-sum-text');
        totalEl.innerText = `Total: $${total}`;
    // localStorage.clear();
    })();

function createOrderElement(confirmedItem) {
    orderArea.innerHTML += `
            <div class="orders__item" id="item_${confirmedItem.id}">
                <div class="orders__item-image">
                    <img src="${confirmedItem.imageSrc}" alt="">
                </div>
                <div class="orders__item-info"">
                    <h3 class="orders__item-info-header">${confirmedItem.name}</h3>
                    <p>Art-nr: ${confirmedItem.artNr}</p>
                </div>
                <div class="orders__item-right">
                    <p>QT:${confirmedItem.quantity}</p>
                    <h4>$${confirmedItem.price}</h4>
                </div>
            </div>
    `;
};