export function getDiscountedPrice(price, discount) {
    return price * (1-discount/100);
}

export function getVatPrice(price, vat) {
    return price * (1 + vat);
}

export function getTransportFee(weight) {
    let transportFee = 0;
    if (weight > 2000) {
        transportFee = 7;
    }
    if (weight > 5000) {
        transportFee = 15;
    }
    if (weight > 10000) {
        transportFee = 20;
    }
    return transportFee;
}

export function calcCartItem(item, vat) {
    const discountedPrice = getDiscountedPrice(item.netPrice, item.discount);
    const price = getVatPrice(discountedPrice, vat);
    const total = price * item.quantity;
    return {
        ...item,
        totalPrice: total,
        totalWeight: item.weight * item.quantity 
    };
}

export function printCartItem(item) {
    if (item.quantity > 1) {
        console.log(`${item.name}(x${item.quantity}): ${item.totalPrice}`);
    } else {
        console.log(`${item.name}: ${item.totalPrice}`);
    }
}

export function getVat(country) {
    return country === 'IT' ? 0.22 : 0;
}