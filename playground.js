// console.log('Ciao Mondo');
// console.info('Ciao Info');
// console.warn('Ciao Worn');
// console.error('Ciao Error');

// var var1 = 90;

// let myVar;
// console.log(myVar);

// myVar = null;
// console.log(myVar);

// myVar = 'ciao';
// console.log(myVar);

// myVar = 15;
// console.log(myVar);

// const myConst = 'ciao';
// let var1 = 'Enrico'
// let myVar = `Ciao ${var1}` // "Ciao" 'Ciao'

// myVar = 15.13;

// myVar = true;

// myVar = null;

// myVar = undefined;

// myVar = [13, 'ciao', null, false];

// myVar = {
//     prop1: 'ciao',
//     prop2: 12,
//     prop3: false
// };

// myVar.prop4 = 'ciao2'

// const propertyName = 'prop1';
// myVar[propertyName]
// myVar['prop5'] = 'ciao3';


// let prezzo = 50;
// let sconto = 30;
// let prezzoScontato = prezzo - (prezzo * sconto / 100);
// console.log(prezzoScontato);

// console.log(7 % 5)

// console.log(sconto++)
// console.log(++sconto)

// let a = 5, b = 10, c = '5';
// let x = a;

// console.log('a==c', a==c);
// console.log('a===c', a===c);

// console.log('a==x', a==x);

// console.log('a!=b', a!=b);
// console.log('a!=c', a!=c);
// console.log('a!==c', a!==c);

// console.log('a>b', a>b);
// console.log('a>=c', a>=c);

// let p = 0, q = '', r = false;
// console.log('p==r', p==r);

// console.log(false && true);
// console.log(false || true);
// console.log(!false);

// let myVar = {
//         prop1: 'ciao',
//         prop2: 12,
//         prop3: false
//     };

// if (!!myVar) {
//     console.log('variabile con valore');
// } else {
//     console.log('variabile vuota');
// }

function sum(num1, num2) {
    if (num2 == undefined) {
        num2 = 0;
    }
    const val = num1 + num2;
    return val;
}

const value = sum(4, 6);

console.log(value);

let double = function (num) {
    return num * 2;
}

let res1 = double(3);
console.log(res1);

const numbers = [1, 2, 3, 4, 5, 6];
const res2 = numbers.map(double);

console.log(res2);

function arrayMap(arr, fn) {
    const result = [];
    for (const el of arr) {
        result.push(fn(el));
    }

    return result;
}

console.log(arrayMap(numbers, double));

numbers.map(num => num * 2);

let double2 = num => num * 2;


let score = 9;
let result;

if (score > 18) {
    result = 'passato';
} else {
    result = 'fallito';
}

result = score > 18 ? 'passato' : (score < 10 ? 'fallimento critico': 'fallimento');

console.log(result);

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

for (const element of numbers) {
    console.log(element);
}

for (const [index, element] of numbers.entries()) { // [[0, 1], [1, 2], ...]
    console.log(`index: ${index}, value: ${element}`);
}

const obj = {
    prop1: 'ciao',
    prop2: 'mondo'
}

const {prop1, prop2} = obj;
console.log(prop1);
console.log(prop2);

const [el1, el2] = ['ciao', 'mondo', 'test'];