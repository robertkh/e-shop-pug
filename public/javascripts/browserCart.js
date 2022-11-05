////////////////////////////////////////////////////
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  var titleId = input.parentElement.parentElement.children[1].innerText.trim();
  for (var i = 0; i < cartItemsArr.length; i++) {
    if (cartItemsArr[i].title == titleId) {
      cartItemsArr[i].qty = input.value;
      break;
    }
  }

  localStorage.setItem(userId, JSON.stringify(cartItemsArr));
  updateCartTotal();
}

////////////////////////////////////////////////////
function updateCartTotal() {
  var cartRows = $(".cart-items-tableRow");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var price = parseFloat($(".cart-item-price")[i].innerText.replace("$", ""));
    var quantity = $(".cart-item-quantity")[i].value;
    var subT = price * quantity;
    $(".cart-item-subtotal")[i].innerText = "$" + subT.toFixed(2);

    total = total + price * quantity;
  }
  $(".cart-total-price")[0].innerText = "$" + total.toFixed(2);
}

////////////////////////////////////////////////////
function removeCartItem(event) {
  var buttonClicked = event.target;
  var nameId =
    buttonClicked.parentElement.parentElement.children[1].innerText.trim();

  buttonClicked.parentElement.parentElement.remove();

  var count = parseInt($("#cartItemsQty").text());
  count--;
  $("#cartItemsQty").text(count);

  for (var i = 0; i < cartItemsArr.length; i++) {
    if (cartItemsArr[i].title == nameId) {
      cartItemsArr.splice(i, 1);
      break;
    }
  }

  localStorage.setItem(userId, JSON.stringify(cartItemsArr));
  updateCartTotal();
  render(page_Number);
}

////////////////////////////////////////////////////
function checkout() {
  let itemsData = [];
  let amountData = {};
  let payDetails = {};

  let items = $("#tableBody").children();

  for (let i = 0; i < items.length; i++) {
    itemsData.push({
      name: items.eq(i).children().eq(1).text().trim(),
      quantity: items.eq(i).children().eq(2).children().val().trim(),
      price: items.eq(i).children().eq(3).text().trim().slice(1),
      currency: "USD",
    });
  }

  amountData.total = 0;
  for (let i = 0; i < items.length; i++) {
    amountData.total += +itemsData[i].quantity * +itemsData[i].price;
  }

  amountData.currency = "USD";
  payDetails.items = itemsData;
  payDetails.amount = amountData;

  let ssData = { pay_Details: payDetails };

  ajaxRequest(
    "/check",
    ssData,
    (res) => {
      console.log("--->>>   ", res);
      window.open("/paypal");
    },
    (err) => {
      $("#cartAlert p").text(err.responseText);
      $("#cartAlert").show();
    }
  );
}

////////////////////////////////////////////////////
function localToCart(uId) {
  cartItemsArr = [];
  $("#tableBody").html("");
  $("#cartItemsQty").text("0");
  updateCartTotal();

  if (localStorage.getItem(uId) == undefined) {
    localStorage.setItem(uId, "[]");
    return;
  }

  cartItemsArr = JSON.parse(localStorage.getItem(uId));
  $("#cartItemsQty").text(cartItemsArr.length);

  for (var i = 0; i < cartItemsArr.length; i++) {
    var cartRowContents = `<tr class = "cart-items-tableRow">
            <td style="vertical-align:middle">
                <img class="cart-item-image" src = "${cartItemsArr[i].imageSrc}" width = "100" height = "100">
            </td> 
            <td style="vertical-align:middle"> 
                <span class = "cart-item-title" >${cartItemsArr[i].title}</span> 
            </td>
            <td style = "vertical-align:middle">
                <input class="cart-item-quantity" style="width:50px" type="number" value="${cartItemsArr[i].qty}">
            </td>
            <td style = "vertical-align:middle">
                <span class = "cart-item-price" >${cartItemsArr[i].price}</span>
            </td>
            <td style = "vertical-align:middle">
                <span class="cart-item-subtotal"></span>
            </td>
            <td style = "vertical-align:middle">
                <button class = "btn btn-danger">
                    <span class = "glyphicon glyphicon-trash"></span> Trash
                </button>
            </td>
        </tr>`;

    $("#tableBody").append(cartRowContents);
  }

  updateCartTotal();
}
