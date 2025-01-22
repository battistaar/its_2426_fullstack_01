function createElement(template) {
  let container = document.createElement('div');
  let html = template.trim();
  container.innerHTML = html;
  return container.firstChild;
}

window.onload = function() {
  console.log('onload');
  
  let template = `
      <li class="list-group-item item">
        <div class="d-flex flex-row d-flex justify-content-between align-items-center">
          <div class="item-name">
            motherboard
          </div>  

          <div class="d-flex flex-row align-items-center justify-content-end flex-wrap">
            <span class="ms-2 d-flex flex-row align-items-center">
              <label class="me-1" for="quantity">qty:</label>
              <input class="form-control item-quantity" value="1" type="number" style="width: 70px">
            </span>
            <span class="ms-2">
              <span class="item-price">1500€</span>
              <span class="item-discount">(-300€)</span>
            </span>
          </div>
        </div>
      </li>
    `;
    const data = {
        name: 'ssd',
        netPrice: 95,
        weight: 100,
        discount: 5,
        quantity: 2
      };
    
    const container = document.getElementById('items-list');
    const toAdd = createElement(template);
    container.appendChild(toAdd);
    toAdd.querySelector('.item-name').innerHTML = data.name;

    let qtyInput = toAdd.querySelector('input.item-quantity');
    qtyInput.addEventListener('change', (event) => {
      console.log('input change');
      console.log(event.target.value);
    });

}