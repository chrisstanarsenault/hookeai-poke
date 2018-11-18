// $(() => {

//   const changeDate = (string) => {
//     return string.split(' ').splice(0, 5).join(' ');
//   };

//   // //ajax get request to get menu item information
//   // $.ajax({
//   //   method: "GET",
//   //   url: "/api/menu"
//   // }).done((items) => {
//   //   for(item of items) {
//   //     const name = $("<div>").text(item.name).appendTo($(.item));
//   //     $("<span>").text(` $${item.price}`).appendTo(name);
//   //     $("<span>").text(` - ${item.description}`).appendTo(name);
//   //   }
//   // });;

//   //ajax get request to get past order information
//   $.ajax({
//     method: "GET",
//     url: "/orders"
//   }).done((orders) => {
//     for(order of orders) {
//       $("<div>").text(changeDate(order.timestamp)).appendTo($(.item));
//       $("<div>").text(`Name ${order.name}`).appendTo($(".order"));
//       $("<div>").text(`Price: ${order.price}`).appendTo($(".order"));
//       $("<div>").text(`Quantity: ${order.quantity}`).appendTo($(".order"));
//       console.log(orders)
//     }
//   });
// });

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
  });
});

let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
// variable 'container' set to cart items container
const container = document.querySelector(".cart-items");
// variable 'cart' set to local storage menu items selected by user
const countOfItems = {};



const deleteFromCart = (id) => {
    // currentCart filter --> ! == id;
    // countOfItems[menuItem.id] = 0;
    // delete divv

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

const generate = (menuItem, append) => {
  let quantity = countOfItems[menuItem.id];
  const $menuItem = $(`
    <div class="item">
      <span> ${menuItem.name} ${menuItem.price/100}</span>
    </div>`
  );
  const $delBtn = $(`<a class="delete"><i class="far fa-trash-alt"></i></a>`);
  $delBtn.click(function(){
    deleteFromCart(menuItem.id);
  });

  if(!currentCart.includes(menuItem.id) || append){
    const $quantity = $(`<span class="item" id="${menuItem.id}item" >${quantity}</span>`);
    const $orderBox = $('<div>').attr('class', 'order').attr('id', `${menuItem.id}del`).appendTo('.order-box');
    $($orderBox).append($quantity);
    $($orderBox).append($menuItem);
    $($orderBox).append($delBtn);
  } else {
    $(`#${menuItem.id}item`).text(countOfItems[menuItem.id]);
  }

};
