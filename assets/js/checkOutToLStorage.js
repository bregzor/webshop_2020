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
}

const chkOutBtn = document.querySelector('#checkOut');
chkOutBtn.addEventListener('click', () => {
	checkOutAddItemtoStorage(cartItems);
	location.href = 'landing.html';
});
