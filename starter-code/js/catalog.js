/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    let constructedOption = document.createElement('option');
    constructedOption.innerText = Product.allProducts[i].name;
    selectElement.appendChild(constructedOption);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

function addSelectedItemToCart() {
  let selectedName = document.querySelector('option:checked').innerText;
  let selectedQuantity = parseInt(document.getElementById('quantity').value);
  // eslint-disable-next-line no-undef
  let item = new CartItem(selectedName, selectedQuantity);
  cart.addItem(item);
}

function updateCounter() {
  let res = 0;
  for( let i = 0; i < cart.items.length; i++){
    res += cart.items[i].product.quantity;
  }
  let countElem = document.getElementById('itemCount');
  countElem.innerText = res;
}

function updateCartPreview() {
  let cartContentEl = document.getElementById('cartContents');
  let itemPreviewList = document.createElement('ul');
  itemPreviewList.id= 'itemPreviewList';
  let ipl = document.getElementById('itemPreviewList');
  if (ipl){
    ipl.innerHTML ='';
    ipl.innerText ='';
    let liEl = document.getElementsByClassName('previewLi');
    for (let i = 0; i < liEl.length; i++){
      liEl[i].innerText = '';
      liEl[i].innerHTML = '';
    }
  }

  for( let i = 0; i < cart.items.length; i++){
    let newListItem = document.createElement('li');
    newListItem.className='previewLi';
    newListItem.innerText = `${cart.items[i].product.product} ${cart.items[i].product.quantity}.`;
    itemPreviewList.appendChild(newListItem);
  }
  cartContentEl.appendChild(itemPreviewList);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
