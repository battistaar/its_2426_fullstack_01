import { cart } from "./cart-data.js";
import { getVat, calcCartItem, getTransportFee } from "./cart-utils.js";
import { CartItem } from './cart-item.js';
import { Summary } from "./summary.js";

window.onload = function() {
  const COUNTRY_CODE = 'IT';
  
  const vat = getVat(COUNTRY_CODE);
  
  // const items = cart.map(item => calcCartItem(item, vat));
  const summaryContainer = document.querySelector('.order-summary');
  summaryContainer.innerHTML = '';
  const summary = new Summary(cart, vat);
  summaryContainer.appendChild(summary.element);
  
  const container = document.getElementById('items-list');
  container.innerHTML = '';
  cart.forEach(item => {
    const cartItem = new CartItem(item, vat);
    cartItem.addEventListener('quantityChange', (event) => {
      item.quantity = event.detail.quantity;
      cartItem.item = item;

      summary.items = cart;
    });
    container.appendChild(cartItem.element);
  });
}