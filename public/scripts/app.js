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

$(document).ready(function(){
    function getItems() {
      let currentCart = localStorage.getItem("cart");
      $("#itemsIdForm").attr("value", JSON.stringify(currentCart));
    }

    function addToCart(id) {
      let currentCart = localStorage.getItem("cart");
      if (currentCart === null) {
        currentCart = [];
      } else {
        currentCart = JSON.parse(currentCart);
      }
      currentCart.push(id);
      localStorage.setItem("cart", JSON.stringify(currentCart));
    };

    getItems();
});
