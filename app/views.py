import hashlib
import random
import time

from django.core.cache import cache
from django.http import JsonResponse
from django.shortcuts import render, redirect


# Create your views here.
from app.models import User


def index(request):
    return render(request,'index.html')


def login(request):
    return render(request,'html/login.html')


# def register(request):
#     return render(request,'html/register.html')

# def login(request):
#     if request.method == 'GET':
#         return render(request, 'mine/login.html')
#     elif request.method == 'POST':
#         email = request.POST.get('email')
#         password = request.POST.get('password')
#
#         # 重定向位置
#         back = request.COOKIES.get('back')
#
#         users = User.objects.filter(email=email)
#         if users.exists():  # 存在
#             user = users.first()
#             if user.password == generate_password(password):    # 验证通过
#                 # 更新token
#                 token = generate_token()
#
#                 # 状态保持
#                 cache.set(token, user.id, 60*60*24*3)
#
#                 # 传递客户端
#                 request.session['token'] = token
#
#                 # 根据back
#                 if back == 'mine':
#                     return redirect('axf:mine')
#                 else:
#                     return redirect('axf:marketbase')
#             else:   # 密码错误
#                 return render(request, 'mine/login.html', context={'ps_err': '密码错误'})
#         else:   # 不存在
#             return render(request, 'mine/login.html', context={'user_err':'用户不存在'})
#
# def logout(request):
#     request.session.flush()
#
#     return redirect('axf:mine')


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


def checkemail(request):
    email = request.GET.get('email')

    # 去数据库中查找
    users = User.objects.filter(email=email)
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

