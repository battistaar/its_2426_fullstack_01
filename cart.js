import { getVat, calcCartItem, getTransportFee, printCartItem } from "./cart-utils.js";
import { cart } from './cart-data.js';

const COUNTRY_CODE = 'IT';

const vat = getVat(COUNTRY_CODE);

const items = cart.map(item => calcCartItem(item, vat));

items.forEach(printCartItem);

let cartTotal = items.reduce((tot, item) => {
  return tot + item.totalPrice;
}, 0);

let totalWeight = items.reduce((tot, item) =>  tot + item.totalWeight, 0);

const transportFee = getTransportFee(totalWeight);

console.log('---------------');
console.log(`Transport Fee: ${transportFee}`);
console.log(`Total: ${cartTotal + transportFee}`);


// const minMax = items.reduce((res, item) => {
//   console.log(res, item.totalPrice);
//   return {
//     min: Math.min(res.min, item.totalPrice),
//     max: Math.max(res.max, item.totalPrice)
//   }
// }, {
//   min: Number.MAX_VALUE,
//   max: Number.MIN_VALUE
// });

// console.log(minMax);