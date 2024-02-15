// ********** ADDED PRICE FUNCTION **********

let updateAddedPrice = function (ele) {
  let price = parseFloat($(ele).find('.price input').val()) || 0;
  let quantity = parseFloat($(ele).find('.quantity input').val()) || 0;

  let addedPrice = price * quantity;
  $(ele).find('.addedPrice').text(addedPrice.toFixed(2));

  return addedPrice;
}

// ********** TOTAL PRICE FUNCTION **********

let sum = function (acc, x) {return acc + x; };

let updateTotalPrice = function () {
  let addedPricesArray = [];

  $('tbody tr').each(function (i, ele) {
    let addedPrice = updateAddedPrice(ele);
    addedPricesArray.push(addedPrice);
  });

  let totalPrice = addedPricesArray.reduce(sum);
  $('#totalPrice').html(totalPrice);
}
