let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shop-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  let sum = 0;
  for (let obj of basket) {
    sum += obj.item;
  }
  cartIcon.innerHTML = sum;
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
               <div class="cart-item">
                    <img width="100" src=  ${search.img} alt="">
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${search.name}</p>
                                <p class="price">$ ${search.price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>

                        <div class="button">
                            <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                        </div>

                        <h3> $ ${item * search.price}</h3>
                    </div>
                </div>
            `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to home</button>
            </a>
        `;
  }
};

generateCartItems();

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
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => {
    return x.id === selectedItem.id;
  });

  if (search === undefined) return;

  if (search.item === 0) return;
  else search.item--;

  update(selectedItem.id);

  // filter 0 items data
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  /* let search = basket.find((x) => {
    return x.id === selectedItem.id;
  });
  search.item = 0;
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0); */

  /**
   * ! below code Same work as above commented in one line
   * ! filter will remove the selected item from basket
   * ! more efficient
   */
  basket = basket.filter((x) => x.id !== selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
  generateCartItems();
  totalAmount();
};

let clearCart = () => {
    basket = [];
    calculation();
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
    if(basket.length != 0){
        let amount = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item*search.price;
        }).reduce((x, y) => x+y, 0) // add elements
        
        label.innerHTML =`<h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">CheckOut</button>
        <button onclick = "clearCart()" class="removeall">Clear Cart</button>`;
    }
    else{
        return;
    }
}
totalAmount();