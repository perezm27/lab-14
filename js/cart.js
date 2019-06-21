/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function clearCart() {
  //remove rows
  let tbodyEle = document.querySelector('#cart tbody');
  tbodyEle.innerHTML ='';

}

function showCart() {
  let tbodyEle = document.querySelector('#cart tbody');
  for( let i = 0; i < cart.items.items.length; i++){
    let currentItem = cart.items.items[i].product;
    console.log(currentItem);
    let trEl = document.createElement('tr');
    //Construct Delete link
    let deleteEl = document.createElement('td');
    let deleteAEl= document.createElement('a'); 
    deleteAEl.innerText = 'delete';
    deleteAEl.id = `${currentItem.product}`;
    deleteEl.appendChild(deleteAEl);
    trEl.appendChild(deleteEl);
    //Construct quantity Element
    let quantityEl = document.createElement('td');
    quantityEl.innerText = `${currentItem.quantity}`;
    trEl.appendChild(quantityEl);
    //Construct item element
    let itemEl = document.createElement('td');
    itemEl.innerText = `${currentItem.product}`;
    trEl.appendChild(itemEl);

    tbodyEle.appendChild(trEl);

  }
}

function removeItemFromCart(event) {
  event.preventDefault();
  cart.removeItem(event.target.id);
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
