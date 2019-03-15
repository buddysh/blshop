$(function () {
    $('.cartlist').each(function () {
        var p=$(this).children('#ip3').children('a').html()
        var n=$(this).children('#ip4').children('a').html()
        $(this).children('#ip5').children('a').html(p*n)
    })

    //
    // var price=$('.cartlist #ip3 a' ).html()
    // var num=$('.cartlist #ip4 a').html()
    // $('.cartlist #ip5 a').html(price*num)

$('#ip #allSelect').click(function () {
        if ($(this).is(':checked')){

            $('.cartlist :checkbox').prop('checked',true);
            $('#bot :checkbox').prop('checked',true);
    }
        else {
            $('.cartlist :checkbox').prop('checked',false);
            $('#bot :checkbox').prop('checked',false);
        }
})

    $('#bot #allSelect').click(function () {
        if ($(this).is(':checked')){

            $('.cartlist :checkbox').prop('checked',true);
            $('#ip :checkbox').prop('checked',true);
    }
        else {
            $('.cartlist :checkbox').prop('checked',false);
            $('#ip :checkbox').prop('checked',false);
        }
})


})

