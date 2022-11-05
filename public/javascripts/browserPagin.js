////////////////////////////////////////////////////
let items_In_Shop = JSON.parse($('#temp_Div').text())
$('#temp_Div').remove()

////////////////////////////////////////////////////
let items_Total_Number = items_In_Shop.length
$('#shopPagination_3').val(4)
let items_Per_Page = 4
let pages_Qty = Math.ceil(items_Total_Number / items_Per_Page)
let page_Number;

////////////////////////////////////////////////////
function render(p_N) {
    console.log(cartItemsArr)
    $('#myShop').text('')
    page_Number = p_N
    const fr = items_Per_Page * (page_Number - 1)
    const to = items_Per_Page * page_Number
    let show_Items = items_In_Shop.slice(fr, to)

    for (let i = 0; i < show_Items.length; i++) {

        let str = '<div class="col-sm-6 col-md-4 col-lg-3 shop-item" style="margin-top: 20px;">'
        str += '<h4 class="shop-item-title text-center">' + show_Items[i].itemName + '</h4>'
        str += '<img class="shop-item-image img-rounded" src="/images/' + show_Items[i].itemName + '.jpg" onerror=" this.src=&quot;/images/phold.png&quot;" width="262.5" height="262.5">'
        str += '<h3 class="shop-item-price text-center">$' + show_Items[i].itemPrice + '</h3>'
        str += '<button class="btn btn-primary btn-lg btn-block shop-item-button" type="button">Add to cart</button>'
        str += '</div>'

        $('#myShop').append(str)
    }
    
    localToRender()
    
    paginationRender()
    
    ready()
}

////////////////////////////////////////////////////
function paginationRender() {
    $('#shopPagination_1').text('')

    const fr = items_Per_Page * (page_Number - 1) + 1
    let to = items_Per_Page * page_Number

    if (page_Number == pages_Qty) {
        to = items_Total_Number
    } else {
        to = items_Per_Page * page_Number
    }

    let str_Left = ''
    str_Left += '<div class="hint-text">Showing '
    str_Left += '<b>' + fr + '</b> to <b>' + to + '</b> of <b>' + items_Total_Number + '</b> entries'

    $('#shopPagination_1').append(str_Left)

    //- ------------------------------------------------------
    $('#shopPagination_2').text('')
    $('#shopPagination_2b').text('')
    let str_1 = '',
        str_2 = '',
        str_3 = '',
        str_2b = ''
    str_1 += '<ul class="pagination">'

    str_1 += '<li class="page-item">'
    if (page_Number == 1)
        str_1 += '<a class="page-link" href="javascript:void()"><i class="fa fa-angle-double-left"></i></a>'
    else
        str_1 += '<a class="page-link" href="javascript:render(' + (page_Number - 1) + ')"><i class="fa fa-angle-double-left"></i></a>'
    str_1 += '</li>'

    for (let i = 1; i <= pages_Qty; i++) {
        if (i == page_Number) {
            str_2 += '<li class="page-item active">'
            str_2 += '<a class="page-link active" href="javascript:render(' + i + ')">' + i + ' </a></li>'
        } else {
            str_2 += '<li class="page-item">'
            str_2 += '<a class="page-link active" href="javascript:render(' + i + ')">' + i + ' </a></li>'
        }
    }

    str_2b += '<li class="page-item active"><a>' + page_Number + '</a>  </li>'
    str_2b += '<li >'
    str_2b += '<a style="background-color: #ff99ce; color: white"> <b> / </b>  ' + pages_Qty + '</a></li>'

    str_3 += '<li class="page-item">'
    if (page_Number < pages_Qty)
        str_3 += '<a class="page-link" href="javascript:render(' + (page_Number + 1) + ')"><i class="fa fa-angle-double-right"></i></a>'
    else
        str_3 += '<a class="page-link" href="javascript:void(0)"><i class="fa fa-angle-double-right"></i></a>'

    str_3 += '</li></ul>'

    $('#shopPagination_2').append(str_1 + str_2 + str_3)
    $('#shopPagination_2b').append(str_1 + str_2b + str_3)
}

////////////////////////////////////////////////////
function select_Pagination(x) {
    if (x.value == 'all') {
        items_Per_Page = items_Total_Number
    } else {
        items_Per_Page = x.value
    }

    pages_Qty = Math.ceil(items_Total_Number / items_Per_Page)

    render(1)
}

////////////////////////////////////////////////////
function localToRender() {
    
    let $div = $('#myShop').children()

    for(let i = 0; i < cartItemsArr.length; i++) {
        for (let j = 0; j < $div.length; j++) {
            if ($div.eq(j).children().eq(0).text().trim() == cartItemsArr[i].title.trim()) {
            $div.eq(j).children().eq(3).append('<i class="fa fa-check pull-right"></i>')
            }
        }
    }    
}