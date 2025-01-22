import { cart } from "./cart-data.js";
import { getVat, calcCartItem, getTransportFee } from "./cart-utils.js";
import { CartItem } from './cart-item.js';

function createElement(template) {
  let container = document.createElement('div');
  let html = template.trim();
  container.innerHTML = html;
  return container.firstChild;
}

function updateSummary(cartItems, vat) {
  const container = document.querySelector('.order-summary');
  container.innerHTML = '';
  
  const items = cartItems.map(item => calcCartItem(item, vat));

  let netTotal = items.reduce((tot, item) => {
    return tot + item.discountedPrice;
  }, 0);

  let total = items.reduce((tot, item) => {
    return tot + item.totalPrice;
  }, 0);

  let totalWeight = items.reduce((tot, item) =>  tot + item.totalWeight, 0);

  const transportFee = getTransportFee(totalWeight);

  const template = `
        <div>
          <div class="d-flex justify-content-between">
            <span>Net Total:</span>
            <span>${netTotal}€</span>
          </div>
          
          <div class="d-flex justify-content-between">
            <span>VAT:</span>
            <span>${total - netTotal}€</span>
          </div>
          <div class="d-flex justify-content-between">
            <span>Transport:</span>
            <span >${transportFee}€</span>
          </div>
          <hr>
          <div class="d-flex justify-content-between">
            <span>Total:</span>
            <span>${total + transportFee}€</span>
          </div>
        </div>
  `;

  const element = createElement(template);
  container.appendChild(element);
}

window.onload = function() {
  const COUNTRY_CODE = 'IT';
  
  const vat = getVat(COUNTRY_CODE);
  
  // const items = cart.map(item => calcCartItem(item, vat));
  const container = document.getElementById('items-list');
  container.innerHTML = '';
  cart.forEach(item => {
    const cartItem = new CartItem(item, vat);
    cartItem.addEventListener('quantityChange', (event) => {
      item.quantity = event.detail.quantity;
      cartItem.item = item;
      updateSummary(cart, vat);
    });
    container.appendChild(cartItem.element);
  });

  updateSummary(cart, vat);
}