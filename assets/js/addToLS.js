//Add item to local storage
function checkOutItemtoStorage(itemsArr) {
	//Each item in arr
	let count = 0;
	itemsArr.forEach(item => {
		//making object to string (for localstorage to read)
		const item_serialized = JSON.stringify(item);
		//adding to storage
		localStorage.setItem(`item_${count++}`, item_serialized);
	});
}

const chkOutBtn = document.querySelector('#checkOut');
chkOutBtn.addEventListener('click', () => {
	//Determine if cart is empty, an send to landing page
	//Clearing storage to add correct array data
	if (cartItems.length > 0) {
		localStorage.clear()
		checkOutItemtoStorage(cartItems);
		location.href = 'landing.html';
	} else {
		alert("Please add something to cart");
	}
});