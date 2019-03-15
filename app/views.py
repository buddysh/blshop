import hashlib
import random
import time

from django.core.cache import cache
from django.http import JsonResponse
from django.shortcuts import render, redirect


# Create your views here.
from app.models import User, Goods, Cart


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