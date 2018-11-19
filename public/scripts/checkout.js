$( document ).ready(function() {
  if(localStorage.getItem("cart") === null){
    localStorage.setItem("cart", JSON.stringify([]));
  }

  function getItems() {
    let currentCart = localStorage.getItem("cart");
    $("#itemsIdForm").attr("value", JSON.stringify(currentCart));
  }

  //current cart --> array of selected ids
  currentCart.forEach((item) => {
    if (!countOfItems[item])
        countOfItems[item] = 0;
      countOfItems[item] ++;
  })

  const createOrder = (obj) => {
    // let total = 0;
    obj.forEach(function(el){
      generate(el, true);

    });
  };

  $.ajax( {
    method: 'POST',
    url: '/orders/getItemInformation',
    data: {
      itemIds: JSON.stringify(countOfItems)
    },
    dataType: 'json'
    })
    .then((menuItems) => {
      createOrder(menuItems);
    $(".total").append(total2);

  });
});

let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
// variable 'container' set to cart items container
const container = document.querySelector(".cart-items");
// variable 'cart' set to local storage menu items selected by user
const countOfItems = {};



const deleteFromCart = (id) => {
    currentCart = currentCart.filter(function(value){
      return value != id;
    });
    countOfItems[id] = 0;
    $(`#${id}del`).remove();
    localStorage.setItem("cart", JSON.stringify(currentCart));
};

function addToCart(id, name, price) {
  if(!countOfItems[id])
    countOfItems[id] = 0 ;
  countOfItems[id] ++ ;

  const object = {id, name, price};
  generate(object, false);
  currentCart.push(id);
  localStorage.setItem("cart", JSON.stringify(currentCart));

};
let total = 0;

const generate = (menuItem, append) => {
  let quantity = countOfItems[menuItem.id];
  const $menuItem = $(`
    <div class="item">
      <span> ${menuItem.name} ${menuItem.price/100}</span>
    </div>`
  );
  total += (menuItem.price / 100) * quantity;
  total2 = parseFloat(total).toFixed(2);

  const $delBtn = $(`<a class="delete"><i class="far fa-trash-alt"></i></a>`);
  console.log(total)
  $delBtn.click(function(){
    deleteFromCart(menuItem.id);
  });

  if(!currentCart.includes(menuItem.id) || append){

    const $quantity = $(`<span class="item" id="${menuItem.id}item" >${quantity}</span><input type="hidden" name="menu_id${menuItem.id}"value=${quantity}>`);

    const $orderBox = $('<div>').attr('class', 'item-container').attr('id', `${menuItem.id}del`).appendTo('.cart-items');
    $($orderBox).append($delBtn);
    $($orderBox).append($quantity);
    $($orderBox).append($menuItem);


  } else {
    $(`#${menuItem.id}item`).text(countOfItems[menuItem.id]);

  }


};















