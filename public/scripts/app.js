$(() => {
  //ajax get request to get menu item information
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((items) => {
    for(item of items) {
      const name = $("<div>").text(item.name).appendTo($("body"));
      $("<span>").text(` $${item.price}`).appendTo(name);
      $("<span>").text(` - ${item.description}`).appendTo(name);
    }
  });;
});
