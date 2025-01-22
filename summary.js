import { createElement, calcCartItem, getTransportFee } from "./cart-utils.js";

export class Summary {
    #element;
    #items = [];
    #vat = 0;

    get element() {
        return this.#element;
    }

    get items() {
        return this.#items;
    }

    set items(val) {
        this.#items = val;
        this.#updateElement();
    }

    get vat() {
        return this.#vat;
    }

    set vat(val) {
        this.#vat = val;
        this.#updateElement();
    }

    constructor(items, vat) {
        if (items !== undefined) {
            this.#items = items;
        }
        if (vat !== undefined) {
            this.#vat = vat;
        }
        this.#element = this.#createElement();
        this.#updateElement();
    }

    #createElement() {
        let template = `
            <div>
            </div>
        `;
        
        return createElement(template);
    }

    #updateElement() {
        const items = this.#items.map(item => calcCartItem(item, this.#vat));
        
        let netTotal = items.reduce((tot, item) => {
            return tot + item.discountedPrice;
        }, 0);
        
        let total = items.reduce((tot, item) => {
            return tot + item.totalPrice;
        }, 0);
        
        let totalWeight = items.reduce((tot, item) =>  tot + item.totalWeight, 0);
        
        const transportFee = getTransportFee(totalWeight);

        let template = `
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
                <span>${transportFee}€</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
                <span>Total:</span>
                <span>${total + transportFee}€</span>
            </div>
        ;`
        this.#element.innerHTML = template.trim();
    }
}