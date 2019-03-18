$(function () {
    var totalnum=0
    $('.cartlist').each(function () {
        var price = $(this).children('#ip3').children('a').html()
        var num = $(this).children('#ip4').children('a').html()
        var money = price*num
        // console.log(money)
        $(this).children('#ip5').children('a').html(money)

        totalnum=totalnum + parseInt(num)
    })
    // console.log(totalnum)
    $('#goods-num').html(totalnum)

})