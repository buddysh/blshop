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
    # url(r'^goodslist/$',views.goodslist,name='goodslist'),
]