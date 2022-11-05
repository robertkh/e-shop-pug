////////////////////////////////////////////////////
$(document).on("click", ".panel-heading span.clickable", function (e) {
  var $this = $(this);

  if (!$this.hasClass("panel-collapsed")) {
    $this.parents(".panel").find(".panel-body").slideUp();
    $this.addClass("panel-collapsed");
    $this
      .find("i")
      .removeClass("glyphicon-chevron-up")
      .addClass("glyphicon-chevron-down");
  } else {
    $this.parents(".panel").find(".panel-body").slideDown();
    $this.removeClass("panel-collapsed");
    $this
      .find("i")
      .removeClass("glyphicon-chevron-down")
      .addClass("glyphicon-chevron-up");
  }
});

////////////////////////////////////////////////////
function delMess(r) {
  var messId = $(r).parents(".panel").find(".hidden").text().trim();

  var ssData = { messId: messId };

  ajaxRequest(
    "/mess/del",
    ssData,
    (res) => {
      console.log(res);
      $(r).parents(".panel").hide();
    },
    (err) => {
      var errors = JSON.parse(err.responseText);
      alert(errors);
    }
  );
}
