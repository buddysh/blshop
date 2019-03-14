$(function () {

    $('body img').each(function () {
        var imgv=$(this).attr('src')
        // console.log(imgv)
        nimgv="{% static '" + imgv + "' %}"
        // console.log(nimgv)
        $(this).attr('src',nimgv)


        //{% static 'images/top1.jpg' %}
    })
    console.log($('body').html())

})