////////////////////////////////////////////////////
function login() {
  let ssData = {
    email: $("#login_1").val().trim(),
    password: $("#login_2").val().trim(),
  };

  ajaxRequest(
    "/user/login",
    ssData,
    (res) => {
      localStorage.setItem("dash", res.dash);
      if (res.dash) {
        $("#admin_Admin").show();
      }
      userId = res.id; // userId-n heto kara petq ga
      localToCart(res.id);

      $("#login").hide();
      $("#loginReset").trigger("reset");
      $("#logout_1").text(res.name);
      $("#logout").show();
    },
    (err) => {
      var errors = JSON.parse(err.responseText);
      $("#userAlert").text("");
      for (var i = 0; i < errors.length; i++) {
        $("#userAlert").append("<li>" + errors[i].msg + "</li>");
      }
      $("#userAlert").show();
      $("#userAlert").delay(5000).fadeOut("slow");
    }
  );
}

////////////////////////////////////////////////////
function logout() {
  ajaxRequest(
    "/user/logout",
    null,
    (data) => {
      alert(data);

      userId = "guest";
      localToCart("guest");

      localStorage.setItem("dash", false);
      $("#admin_Admin").hide();

      $("#logout_1").text("");
      $("#logout").hide();
      $("#login").show();
    },
    (err) => {
      alert(err.responseText);
    }
    // cookie - ն ջնջվում է սերվերից։
  );
}

////////////////////////////////////////////////////
function signup() {
  let ssData = {
    username: $("#signup_1").val().trim(),
    email: $("#signup_2").val().trim(),
    password: $("#signup_3").val().trim(),
    confirmPassword: $("#signup_4").val().trim(),
  };

  ajaxRequest(
    "/user/signup",
    ssData,
    (res) => {
      alert(res);
      $("#signup").hide();
      $("#signupReset").trigger("reset");
      $("#login").show();
    },
    (err) => {
      var errors = JSON.parse(err.responseText);
      $("#userAlert").text("");
      for (var i = 0; i < errors.length; i++) {
        $("#userAlert").append("<li>" + errors[i].msg + "</li>");
      }
      $("#userAlert").show();
      $("#userAlert").delay(5000).fadeOut("slow");
    }
  );
}

////////////////////////////////////////////////////
function resetPassword() {
  let ssData = {
    email: $("#reset_1").val().trim(),
    password: $("#reset_2").val().trim(),
  };

  ajaxRequest(
    "/user/getnewpass",
    ssData,
    (res) => {
      alert(res);
      $("#resetReset").trigger("reset");
    },
    (err) => {
      var errors = JSON.parse(err.responseText);
      $("#userAlert").text("");
      for (var i = 0; i < errors.length; i++) {
        $("#userAlert").append("<li>" + errors[i].msg + "</li>");
      }
      $("#userAlert").show();
      $("#userAlert").delay(5000).fadeOut("slow");
    }
  );
}

////////////////////////////////////////////////////
function getcookieName() {
  var decodedCookie = decodeURIComponent(document.cookie);

  var ca = decodedCookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf("activeu=") == 0) {
      return c.substring("activeu=".length, c.length);
    }
  }

  return null;
}

////////////////////////////////////////////////////
function getcookieId() {
  var decodedCookie = decodeURIComponent(document.cookie);

  var ca = decodedCookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf("activeid=") == 0) {
      return c.substring("activeid=".length, c.length);
    }
  }

  return "guest";
}

////////////////////////////////////////////////////
function showcookieResults() {
  var activeUser = getcookieName();

  if (!activeUser) {
    console.log(
      "Սա նշանակում է, որ սեսսիան ավարտվել է, նորից պետք կլինի մուտք անել համակարգ։"
    );
    // կարծես ավտոմատ հենց լօգին ա բերում
  } else {
    $("#login").hide();
    $("#logout").show();
    $("#logout_1").text(activeUser);
  }
}
