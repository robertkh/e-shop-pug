////////////////////////////////////////////////////
var cartItemsArr = [];
let userId;
var button;

////////////////////////////////////////////////////
function ready() {
  var addToCartButtons = document.getElementsByClassName("shop-item-button");

  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-item-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
}

////////////////////////////////////////////////////
function addToCartClicked(event) {
  console.log("--->>>   addToCartClicked invouked");

  button = event.target;

  var shopItem = button.parentElement;

  var shopItemObj = {
    imageSrc: shopItem.getElementsByClassName("shop-item-image")[0].src,
    title: shopItem.getElementsByClassName("shop-item-title")[0].innerText,
    qty: 1,
    price: shopItem.getElementsByClassName("shop-item-price")[0].innerText,
  };

  addItemToCart(shopItemObj);
  updateCartTotal();
}

////////////////////////////////////////////////////
function addItemToCart(shopItemObj) {
  console.log("--->>>   addItemToCart invouked");

  var cartItemIds = $(".cart-item-title");

  for (var i = 0; i < cartItemIds.length; i++) {
    if (cartItemIds[i].innerText == shopItemObj.title) {
      return;
    }
  }

  $(button).append('<i class="fa fa-check pull-right"></i>');

  var count = parseInt($("#cartItemsQty").text());
  count++;
  $("#cartItemsQty").text(count);

  var cartRowContents = `<tr class = "cart-items-tableRow">
            <td style="vertical-align:middle">
                <img class="cart-item-image" src = "${shopItemObj.imageSrc}" width = "100" height = "100">
            </td> 
            <td style="vertical-align:middle"> 
                <span class = "cart-item-title" >${shopItemObj.title}</span> 
            </td>
            <td style = "vertical-align:middle">
                <input class="cart-item-quantity" style="width:50px" type="number" value="${shopItemObj.qty}">
            </td>
            <td style = "vertical-align:middle">
                <span class = "cart-item-price" >${shopItemObj.price}</span>
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

  cartItemsArr.push(shopItemObj);

  localStorage.setItem(userId, JSON.stringify(cartItemsArr));
  for (var i = 0; i < $(".cart-items-tableRow").length; i++) {
    $(".btn-danger")[i].addEventListener("click", removeCartItem);
    $(".cart-item-quantity")[i].addEventListener("change", quantityChanged);
  }
}
