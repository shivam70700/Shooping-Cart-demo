let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let {id, name, price, desc, img} = x;
      let search = basket.find((x) => x.id === id) || []
      return `
    <div id = product-id-${id} class="item">
            <img width="222" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$${price}</h2>
                    <div class="button">
                        <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                        <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => {
    return x.id === selectedItem.id;
  });

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item++;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};
let decrement = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => {
    return x.id === selectedItem.id;
  });

  if(search === undefined) return; 

  if (search.item === 0) return;
  else search.item--;

  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0)
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  let sum = 0;
  for (let obj of basket) {
    sum += obj.item;
  }
  cartIcon.innerHTML = sum;
};

calculation()