////////////////////////////////////////////////////
function ajaxRequest(route, sendData, succFun, errFun) {
  var ajaxOptions = {
    url: route,
    data: sendData,
    type: "POST",
    timeout: 5000,
    cache: false,
    success: succFun,
    error: errFun,
  };

  $.ajax(ajaxOptions);
}
