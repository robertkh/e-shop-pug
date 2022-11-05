////////////////////////////////////////////////////
function messSend() {
  let ssData = {
    username: $("#contact_1").val().trim(),
    email: $("#contact_2").val().trim(),
    subject: $("#contact_3").val().trim(),
    message: $("#contact_4").val().trim(),
  };

  ajaxRequest(
    "/mess/send",
    ssData,
    (res) => {
      alert(res);
      $("#contactReset").trigger("reset");
      $("#contact").modal("hide"); // jquery - um ajl e
    },
    (err) => {
      var errors = JSON.parse(err.responseText);
      $("#messAlert").text("");
      for (var i = 0; i < errors.length; i++) {
        $("#messAlert").append("<li>" + errors[i].msg + "</li>");
      }
      $("#messAlert").show();
      $("#messAlert").delay(5000).fadeOut("slow");
    }
  );
}
