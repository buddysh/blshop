$(function () {

    //支付按钮
    $('.pay_btn').click(function () {
        var orderid = $(this).attr("orderid")
        request_data = {
            'orderid': orderid,
        }
        $.get('/pay', request_data, function (response) {

            if (response.status == 1) {
                window.open(response.alipayurl, '_self')
            }
        })
    })

    $('.pay_btn').each(function () {
        if ($(this).attr('id') == 0) {
            $(this).attr('value', '未付款')

        } else if ($(this).attr('id') == 1) {
            $(this).attr('value', '待发货')
            $(this).attr('disabled',true)

        } else if ($(this).attr('id') == 2) {
            $(this).attr('value', '待收货')
            $(this).attr('disabled',true)

        } else if ($(this).attr('id') == 3) {
            $(this).attr('value', '待评价')
            $(this).attr('disabled',true)

        } else if ($(this).attr('id') == 4) {
            $(this).attr('value', '已评价')
            $(this).attr('disabled',true)

        }

    })


    //订单描述
    $('.list111').each(function () {

        var that = $(this).children('#orderdesc')
        var orderid = $(this).children('#orderdesc').attr('orderid')
        console.log(orderid)
        request_data = {
            'orderid': orderid,
        }
        $.get('/orderdesc', request_data, function (response) {

            that.html(response.desc)
            console.log(response.desc)
        })

    })



})