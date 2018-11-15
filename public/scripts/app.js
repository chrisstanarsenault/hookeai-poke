$(() => {

  const changeDate = (string) => {
    return string.split(' ').splice(0, 5).join(' ');
  };

  //ajax get request to get menu item information
  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((items) => {
    for(item of items) {
      const name = $("<div>").text(item.name).appendTo($("body"));
      $("<span>").text(` $${item.price}`).appendTo(name);
      $("<span>").text(` - ${item.description}`).appendTo(name);
    }
  });;

  //ajax get request to get past order information
  $.ajax({
    method: "GET",
    url: "/api/past"
  }).done((orders) => {
    // for(order of orders) {
      // $("<div>").text(order).appendTo($(".order"));
      console.log(orders)
    // }
  });
});
