////////////////////////////////////////////////////
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  var actions =
    '<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>';
  actions +=
    '<a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>';
  actions +=
    '<a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>';

  // Append table with add row form on add new button click
  $(".add-new").click(function () {
    $(this).attr("disabled", "disabled");

    var index = $(".admin-table tbody tr:last-child").index();

    var row =
      "<tr>" +
      '<td><img src="/images/phold.png" alt="Ապրանքի նկարը չի ներբեռնված" width="50" height="50"></td>' +
      '<td><input type="text" class="form-control" name="name" id="name"></td>' +
      '<td><input type="text" class="form-control" name="department" id="department"></td>' +
      '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
      "<td>" +
      actions +
      "</td>" +
      "</tr>";
    $(".admin-table").append(row);
    $(".admin-table tbody tr")
      .eq(index + 1)
      .find(".add, .edit")
      .toggle();
    $('[data-toggle="tooltip"]').tooltip();
  });

  $(document).on("click", ".add", function () {
    var empty = false;
    var $tr = $(this).parents("tr");
    var $td = $tr.find("td");

    var $input = $(this).parents("tr").find("input");

    $input.each(function () {
      if (!$(this).val()) {
        $(this).addClass("error");
        empty = true;
      } else {
        $(this).removeClass("error");
      }
    });

    $(this).parents("tr").find(".error").first().focus();

    if (!empty) {
      let serverSendData = {
        itemName: $input[0].value.trim(),
        itemQty: $input[1].value.trim(),
        itemPrice: $input[2].value.trim(),
      };

      ajaxRequest("/store/add", serverSendData, addNewItemSucc, errAddNewItem);

      function addNewItemSucc(data) {
        $input.each(function () {
          $(this).parent("td").html($(this).val().trim());
        });
        const imgStr =
          '<img onerror=" this.src=&quot;/images/phold.png&quot;" class="cart-item-image" src="/images/' +
          $td.eq(1).text() +
          '.jpg" width="50" height="50"> ';
        $td.eq(0).html(imgStr);

        var temp = $td.eq(3).text();
        temp = parseFloat(temp).toFixed(2);
        $td.eq(3).text(temp);

        $tr.find(".add, .edit").toggle();
        $(".add-new").removeAttr("disabled");

        $("#alert").text("");
      }

      function errAddNewItem(err) {
        var errors = JSON.parse(err.responseText);
        $("#alert").text("");
        for (var i = 0; i < errors.length; i++) {
          $("#alert").append("<li>" + errors[i].msg + "</li>");
        }
      }
    }
  });

  $(document).on("click", ".edit", function () {
    $("#alert").text("");
    let i = 0;
    $(this)
      .parents("tr")
      .find("td:not(:last-child)")
      .each(function () {
        if (i == 0) {
          i++;
        } else {
          $(this).html(
            '<input type="text" class="form-control" value="' +
              $(this).text() +
              '">'
          );
        }
      });

    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", "disabled");
  });

  $(document).on("click", ".delete", function () {
    $("#alert").text("");
    var $tr = $(this).parents("tr");
    var itemName = $tr.find("td").eq(1).text().trim();

    let ssData = {
      itemName: itemName,
    };
    if (ssData.itemName !== "") {
      ajaxRequest(
        "/store/del",
        ssData,
        (res) => {
          alert(res);
        },
        (err) => {
          alert(err.responseText);
        }
      );
    }

    $tr.remove();
    $(".add-new").removeAttr("disabled");
  });
});

////////////////////////////////////////////////////
$(document).on("click", "#close-preview", function () {
  $(".image-preview").popover("hide");

  $(".image-preview").hover(
    function () {
      $(".image-preview").popover("show");
    },
    function () {
      $(".image-preview").popover("hide");
    }
  );
});

////////////////////////////////////////////////////
$(function () {
  var closebtn = $("<button/>", {
    type: "button",
    text: "x",
    id: "close-preview",
    style: "font-size: initial;",
  });
  closebtn.attr("class", "close pull-right");

  $(".image-preview").popover({
    trigger: "manual",
    html: true,
    title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
    content: "There's no image",
    placement: "bottom",
  });

  $(".image-preview-clear").click(function () {
    $(".image-preview").attr("data-content", "").popover("hide");
    $(".image-preview-filename").val("");
    $(".image-preview-clear").hide();
    $(".image-preview-input input:file").val("");
    $(".image-preview-input-title").text("Browse");
  });

  $(".image-preview-input input:file").change(function () {
    var img = $("<img/>", {
      id: "dynamic",
      width: 250,
      height: 200,
    });
    var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      $(".image-preview-input-title").text("Change");
      $(".image-preview-clear").show();
      $(".image-preview-filename").val(file.name);
      img.attr("src", e.target.result);
      $(".image-preview")
        .attr("data-content", $(img)[0].outerHTML)
        .popover("show");
    };
    reader.readAsDataURL(file);
  });
});

////////////////////////////////////////////////////
$(document).ready(function () {
  $("#example").DataTable({
    order: [[1, "asc"]],
    lengthMenu: [
      [3, 4, 6, -1],
      [3, 4, 6, "All"],
    ],
    columnDefs: [
      {
        targets: [0, 4],
        searchable: false,
        orderable: false,
      },
    ],
  });
});
