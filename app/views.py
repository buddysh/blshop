import hashlib
import random
import time
from urllib.parse import parse_qs

from django.core.cache import cache
from django.http import JsonResponse
from django.shortcuts import render, redirect


# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from app.alipay import alipay
from app.models import User, Goods, Cart, Order, OrderGoods


def index(request):
    # 获取
    token = request.session.get('token')
    userid = cache.get(token)

    response_data ={
        'user': None
    }

    if userid:
        user = User.objects.get(pk=userid)
        response_data['user'] = user
        #
        # orders = user.order_set.all()
        # # 待付款
        # response_data['waitpay'] = orders.filter(status=0).count()
        # # 待发货
        # response_data['paydone'] = orders.filter(status=1).count()

    goods=Goods.objects.all()[:6]
    response_data['goods']=goods
    # print(goods)

    return render(request,'index.html',context=response_data)


# def login(request):
#     return render(request,'html/login.html')


# def register(request):
#     return render(request,'html/register.html')

def login(request):
    if request.method == 'GET':
        return render(request, 'html/login.html')
    elif request.method == 'POST':
        name = request.POST.get('name')
        password = request.POST.get('password')

        # 重定向位置
        # back = request.COOKIES.get('back')

        users = User.objects.filter(name=name)
        if users.exists():  # 存在
            user = users.first()
            if user.password == generate_password(password):    # 验证通过
                # 更新token
                token = generate_token()

                # 状态保持
                cache.set(token, user.id, 60*60*24*3)

                # 传递客户端
                request.session['token'] = token

                # 根据back
                # if back == 'mine':
                #     return redirect('axf:mine')
                # else:
                return redirect('app:index')
            else:   # 密码错误
                return render(request, 'html/login.html', context={'ps_err': '密码错误'})
        else:   # 不存在
            return render(request, 'html/login.html', context={'user_err':'用户不存在'})
#
def logout(request):
    request.session.flush()

    return redirect('app:index')


def generate_password(param):
    md5 = hashlib.md5()
    md5.update(param.encode('utf-8'))
    return md5.hexdigest()


def generate_token():
    temp = str(time.time()) + str(random.random())
    md5 = hashlib.md5()
    md5.update(temp.encode('utf-8'))
    return md5.hexdigest()


def register(request):
    if request.method == 'GET':
        return render(request, 'html/register.html')
    elif request.method == 'POST':
        # 获取数据
        email = request.POST.get('email')
        name = request.POST.get('name')
        passoword = generate_password(request.POST.get('password'))

        # 存入数据库
        user = User()
        user.email = email
        user.password = passoword
        user.name = name
        user.save()

        # 状态保持
        token = generate_token()
        # key-value  >>  token:userid
        cache.set(token, user.id, 60*60*24*3)

        request.session['token'] = token

        return redirect('app:index')


def checkuser(request):
    name = request.GET.get('name')
    # print(name)
    # 去数据库中查找
    users = User.objects.filter(name=name)
    if users.exists():  # 账号被占用
        response_data = {
            'status': 0,  # 1可用， 0不可用
            'msg': '账号被占用!'
        }
    else:   # 账号可用
        response_data = {
            'status':1,  # 1可用， 0不可用
            'msg': '账号可用!'
        }

    # 返回JSON数据
    return JsonResponse(response_data)

# insert into goods values ('甘蒂牧场（MUH）全脂纯牛奶 1L 德国进口',7.9,13.0,1,'甘蒂牧场（MUH）全脂纯牛奶 1L 德国进口','images/ha/360.jpg')

# def goodslist(request):
#     goods=Goods.objects.all()
#     print(goods)
#     return render(request,'index.html',context={'goods':goods})
def goodsdetail(request,goodid):
    # 获取
    token = request.session.get('token')
    userid = cache.get(token)

    response_data ={
        'user': None
    }

    if userid:
        user = User.objects.get(pk=userid)
        response_data['user'] = user
    good=Goods.objects.get(pk=goodid)
    response_data['good']=good
    # print(goodid)
    return render(request,'goodsdetail.html',context=response_data)


def cart(request):
    # 获取
    token = request.session.get('token')
    userid = cache.get(token)

    response_data ={
        'user': None
    }

    if userid:
        user = User.objects.get(pk=userid)
        response_data['user'] = user
        carts = user.cart_set.all()
        # cart=Cart.objects.filter(user=user)
        # goods=cart.goods
        response_data['carts']=carts
        return render(request,'cart.html',context=response_data)
    else:
        return redirect('app:login')


def addcart(request):
    token = request.session.get('token')
    userid = cache.get(token)
    goodsid = request.GET.get('goodsid')
    goodsnum = request.GET.get('goodsnum')
    # print(goodsid)
    response_data={
        'user':None,
    }
    if userid:
        user = User.objects.get(pk=userid)
        goods = Goods.objects.get(pk=goodsid)
        cart = Cart.objects.filter(goods=goods).filter(user=user)
        if cart.exists():
            cart=cart.first()
            cart.num = cart.num + int(goodsnum)
            cart.save()
        else:
            cart=Cart()
            cart.goods=goods
            cart.user=user
            cart.num = int(goodsnum)
            cart.save()
        # response_data['user'] = user
        response_data['user_status'] = 1
        response_data['cart_num']=cart.num

        # response_data['goodsid'] = goodsid
    else:
        response_data['user_status'] = 0

    return JsonResponse(response_data)

# 修改购物车选中状态
def changecartselect(request):
    cartid = request.GET.get('cartid')
    checked = request.GET.get('checked')
    cart = Cart.objects.get(pk=cartid)

    if checked == 'true':
        cart.isselect = True
        cart.save()
    elif checked == 'false':
        cart.isselect = False
        cart.save()

    response_data = {
        'msg': '状态修改成功',
        'status': 1,
        # 'isselect': cart.isselect
    }
    return JsonResponse(response_data)

def generateOrderNo():
    ltime=str(time.time()).split('.')
    no=ltime[0] + ltime[1] + str(random.randrange(1000,9999))
    return no

def genOrder(request):
    # 获取
    token = request.session.get('token')
    userid = cache.get(token)
    money=request.GET.get('money')
    # print(money)

    response_data ={
        'user': None
    }

    if userid:
        user = User.objects.get(pk=userid)
        response_data['user_status'] = 1
        order=Order()
        order.user = user
        order.identifier = generateOrderNo()
        order.money=money
        order.save()
        carts = user.cart_set.filter(isselect=True)

        for cart in carts:
            ordergoods=OrderGoods()
            ordergoods.order=order
            ordergoods.goods=cart.goods
            ordergoods.number=cart.num
            ordergoods.save()
            cart.delete()

        # carts = user.cart_set.all()
        # cart=Cart.objects.filter(user=user)
        # goods=cart.goods
        # response_data['carts']=carts
        return JsonResponse(response_data)
        # return render(request,'myOrder.html',context=response_data)
    else:
        return redirect('app:login')


def myOrder(request):
    # 获取
    token = request.session.get('token')
    userid = cache.get(token)
    response_data ={
        'user': None
    }

    if userid:
        user = User.objects.get(pk=userid)
        response_data['user_status'] = 1
        response_data['user'] = user
        orders=user.order_set.all()
        # for order in orders:
        #     ordergoods=order.ordergoods_set.all()
        #     for ordergood in ordergoods:
        #         ordergood.goods.name +=ordergood.goods.name + 'X' + str(ordergood.number)
        #
        #     response_data['desc'] = ordergood.goods.name
        response_data['orders'] = orders
        # 状态
        # -1 过期
        # 0 未付款
        # 1 已付款，待发货
        # 2 已发货，待收货
        # 3 已收货，待评价
        # 4 已评价

        return render(request, 'myOrder.html',context=response_data)
    else:
        return redirect('app:login')






def pay(request):
    orderid=request.GET.get('orderid')
    order=Order.objects.get(pk=orderid)

    # 支付地址信息
    data = alipay.direct_pay(
        subject='MackBookPro [256G 8G 灰色]', # 显示标题
        out_trade_no=order.identifier,    # 爱鲜蜂 订单号
        total_amount=str(order.money),   # 支付金额
        return_url='http://39.105.223.106:82/returnurl/'
    )

    # 支付地址
    alipay_url = 'https://openapi.alipaydev.com/gateway.do?{data}'.format(data=data)

    response_data = {
        'msg': '调用支付接口',
        'alipayurl': alipay_url,
        'status': 1
    }

    return JsonResponse(response_data)


def returnurl(request):
    return redirect('app:myOrder')

@csrf_exempt
def appnotifyurl(request):
    if request.method == 'POST':
        # 获取到参数
        body_str = request.body.decode('utf-8')
        # 通过parse_qs函数
        post_data = parse_qs(body_str)
        # 转换为字典
        post_dic = {}
        for k,v in post_data.items():
            post_dic[k] = v[0]
        # 获取订单号
        out_trade_no = post_dic['out_trade_no']
        # 更新状态
        Order.objects.filter(identifier=out_trade_no).update(status=1)
    return JsonResponse({'msg':'success'})


def orderdetail(request,orderid):
    # 获取
    token = request.session.get('token')
    userid = cache.get(token)
    response_data ={
        'user': None
    }

    if userid:
        user = User.objects.get(pk=userid)
        response_data['user_status'] = 1
        response_data['user'] = user
        # 根据orderid获取具体order
        order=Order.objects.get(pk=orderid)
        #根据具体order获取订单商品结果集
        ordergoods=order.ordergoods_set.all()
        response_data['ordergoods']=ordergoods
        response_data['order']=order

    return render(request,'orderdetail.html',context=response_data)

# 获取订单描述信息
def orderdesc(request):
    orderid=request.GET.get('orderid')
    print(orderid)
    # 根据orderid获取具体order
    order = Order.objects.get(pk=orderid)
    response_data={}
    desc = ''
    # 根据具体order获取订单商品结果集
    ordergoods = order.ordergoods_set.all()
    # response_data['ordergoods'] = ordergoods
    for ordergood in ordergoods:
        desc += ordergood.goods.name + 'X' + str(ordergood.number) + '<br>'
    response_data['desc'] = desc
    return JsonResponse(response_data)