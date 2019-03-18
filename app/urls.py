from django.conf.urls import url

from app import views

urlpatterns=[
    url(r'^$',views.index,name='index'),
    url(r'^login/$',views.login,name='login'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^register/$',views.register,name='register'),
    url(r'^checkuser/$',views.checkuser,name='checkuser'),
    url(r'^goodsdetail/(\d+)$',views.goodsdetail,name='goodsdetail'),
    url(r'^cart/$',views.cart,name='cart'),
    url(r'^addcart/$',views.addcart,name='addcart'),
    # 购物车商品是否选中状态
    url(r'^changecartselect/$',views.changecartselect,name='changecartselect'),
    # 生成order
    url(r'^genOrder/$',views.genOrder,name='genOrder'),
    #order列表
    url(r'^myOrder/$',views.myOrder,name='myOrder'),
    # 支付
    url(r'^pay/$',views.pay,name='pay'),
    # 支付返回页面
    url(r'^returnurl/$',views.returnurl,name='returnurl'),
    #支付回调页面
    url(r'^appnotifyurl/$',views.appnotifyurl,name='appnotifyurl'),
    # url(r'^goodslist/$',views.goodslist,name='goodslist'),
    url(r'^orderdetail/(\d+)$',views.orderdetail,name='orderdetail'),
    url(r'^orderdesc/$',views.orderdesc,name='orderdesc'),
]