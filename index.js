import { cart } from "./cart-data.js";
import { getVat, calcCartItem, getTransportFee } from "./cart-utils.js";

function createElement(template) {
  let container = document.createElement('div');
  let html = template.trim();
  container.innerHTML = html;
  return container.firstChild;
}

function createCartItem(item, onQtyChanged) {
  let template = `
        <li class="list-group-item item">
          <div class="d-flex flex-row d-flex justify-content-between align-items-center">
            <div class="item-name">
              ${item.name}
            </div>  
  
            <div class="d-flex flex-row align-items-center justify-content-end flex-wrap">
              <span class="ms-2 d-flex flex-row align-items-center">
                <label class="me-1" for="quantity">qty:</label>
                <input class="form-control item-quantity" value="${item.quantity}" type="number" style="width: 70px">
              </span>
              <span class="ms-2">
                <span class="item-price"></span>
                <span class="item-discount"></span>
              </span>
            </div>
          </div>
        </li>
      `;
      
      const toAdd = createElement(template);

      let qtyInput = toAdd.querySelector('input.item-quantity');
      qtyInput.addEventListener('change', (event) => {
        onQtyChanged(parseInt(event.target.value));
      });
      updateCartItem(toAdd, item);
      return toAdd;
}

function updateCartItem(element, data) {
  element.querySelector('.item-price').innerHTML = `${data.totalPrice}€`;

  const discount = Math.round(data.discountAmount * 100)/100;

  if (discount > 0) {
    element.querySelector('.item-discount').innerHTML = `(-${discount}€)`;
  } else {
    element.querySelector('.item-discount').innerHTML = '';
  }
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
    const parsedItem = calcCartItem(item, vat);

    const element = createCartItem(parsedItem, newQty => {
      item.quantity = newQty;
      updateCartItem(element, calcCartItem(item, vat));
      updateSummary(cart, vat);
    });

    container.appendChild(element);
  });

  updateSummary(cart, vat);
}