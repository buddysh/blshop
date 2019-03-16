$(function () {
    //计算价格 单个商品的总价
    $('.cartlist').each(function () {
        var p=$(this).children('#ip3').children('a').html()
        var n=$(this).children('#ip4').children('a').html()
        $(this).children('#ip5').children('a').html(p*n)
    })

    //

//上部的全选按钮
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
    //底部的全选按钮
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

    // 计算选中商品的总价
    $('.select-btn :checkbox').click(function () {
        totalprice()

    })
    totalprice()
   function totalprice() {
        var sum = 0
        var num = 0
       //循环遍历
        $('.cartlist').each(function () {

                if ($(this).children('#ip1').children('#Select').is(':checked')){
                    var request_data={
                        'cartid':$(this).children('#ip1').children('#Select').attr('cartid'),
                        'checked':'true',
                        }
                     //选中 修改购物车中物品状态
                     $.get('/changecartselect',request_data,function (response) {
                        // console.log(response)
                        })

                    sum = sum +parseFloat($(this).children('#ip5').children('a').html())
                    num = num + parseInt($(this).find('#ip4').children('a').html())
                }
                else {
                    var request_data={
                        'cartid':$(this).children('#ip1').children('#Select').attr('cartid'),
                        'checked':'false',
                        }
                        //未选中 修改购物车中物品状态
                    $.get('/changecartselect',request_data,function (response) {
                        // console.log(response)
                        })
                }
            })
        //总价格
        $('#bot6 #total i').html(sum)
       //总数量
       $('#bot4 #goods-num').html(num)
    }




    //生成订单
    $('#bot7 button').click(function () {

        var request_data={
            'money':$('#bot6 #total i').html()
        }

        $.get('/genOrder',request_data,function (response) {
            // console.log(response)
        })

        window.open('/myOrder','_self')
    })

})


