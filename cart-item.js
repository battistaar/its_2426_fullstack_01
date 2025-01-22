import { createElement, calcCartItem } from "./cart-utils.js";

export class CartItem extends EventTarget {
    #element;
    #item;
    #vat = 0;

    get element() {
        if(!this.#item) {
            throw new Error('Cannot render CartItem without an item');
        }
        return this.#element;
    }

    get item() {
        return this.#item;
    }

    set item(val) {
        this.#item = val;
        this.#updateElement();
    }

    get vat() {
        return this.#vat;
    }

    set vat(val) {
        this.#vat = val;
        this.#updateElement();
    }

    constructor(item, vat) {
        super();
        if (item !== undefined) {
            this.#item = item;
        }
        if (vat !== undefined) {
            this.#vat = vat;
        }
        this.#element = this.#createElement();
        this.#attachEventListeners();
        this.#updateElement();
    }

    #createElement() {
        let template = `
        <li class="list-group-item item">
          <div class="d-flex flex-row d-flex justify-content-between align-items-center">
            <div class="item-name">
            </div>  
  
            <div class="d-flex flex-row align-items-center justify-content-end flex-wrap">
              <span class="ms-2 d-flex flex-row align-items-center">
                <label class="me-1" for="quantity">qty:</label>
                <input class="form-control item-quantity" value="1" type="number" style="width: 70px">
              </span>
              <span class="ms-2">
                <span class="item-price"></span>
                <span class="item-discount"></span>
              </span>
            </div>
          </div>
        </li>
      `;
      
      return createElement(template);
    }

    #attachEventListeners() {
        const input = this.#element.querySelector('input.item-quantity');
        input.addEventListener('change', (event) => {
            const newQuantity = parseInt(event.target.value);

            const qtyEvent = new CustomEvent('quantityChange', {
                detail: {
                    item: this.#item,
                    quantity: newQuantity
                }
            });

            this.dispatchEvent(qtyEvent);
        });
    }

    #updateElement() {
        if (!this.#item) {
            return;
        }

        const parsedItem = calcCartItem(this.#item, this.#vat);
        this.#element.querySelector('.item-name').innerHTML = parsedItem.name;
        this.#element.querySelector('.item-quantity').value = parsedItem.quantity;
        this.#element.querySelector('.item-price').innerHTML = `${parsedItem.totalPrice}€`;
        this.#element.querySelector('.item-discount').innerHTML = `(-${parsedItem.discountAmount}€)`;
    }
}