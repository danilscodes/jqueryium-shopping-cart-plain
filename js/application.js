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

  let totalPrice = addedPricesArray.length > 0 ? addedPricesArray.reduce(sum) : 0;
  $('#totalPrice').html(totalPrice.toFixed(2));
}

// ********** DOCUMENT READY WRAPPER **********

$(document).ready(function () {
  updateTotalPrice();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updateTotalPrice();
  });

  $(document).on('change', '.priceInput, .quantityInput', function () {
    updateAddedPrice($(this).closest('tr'));
    updateTotalPrice();
  });

  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    let newItem = $(this).find('[name=item]').val();
    let newPrice = $(this).find('[name=price]').val();
    let newQuantity = $(this).find('[name=quantity]').val() || 0;

    $('tbody').append('<tr>' +
      '<td class="item">' + newItem + '</td>' +
      '<td class="price"><input class="priceInput" type="number" value="' + newPrice + '" /></td>' +
      '<td class="quantity"><input class="quantityInput" type="number" value="' + newQuantity + '" /></td>' +
      '<td class="addedPrice"></td>' +
      '<td><button class="btn btn-sm remove">Remove</button></td>' +
    '</tr>');

    updateTotalPrice();
    $(this).children('[name=item]').val('');
    $(this).children('[name=price]').val('');
    $(this).children('[name=quantity]').val('');
  });
});
