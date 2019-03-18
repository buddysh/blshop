from django.db import models

# Create your models here.

class User(models.Model):
    name=models.CharField(max_length=40,unique=True)
    password=models.CharField(max_length=60)
    email=models.CharField(max_length=20,unique=True)

class Goods(models.Model):
    #商品名称
    name=models.CharField(max_length=100,unique=True)
    #价格
    price=models.DecimalField(max_digits=6,decimal_places=2)
    #参考价格
    referprice=models.DecimalField(max_digits=6,decimal_places=2)
    #商品类别
    categoryid=models.IntegerField(null=True)
    #商品描述
    desc=models.CharField(max_length=200)
    #商品图片
    pic=models.CharField(max_length=200)

    class Meta:
        db_table='goods'

class Cart(models.Model):
    goods=models.ForeignKey(Goods)
    user=models.ForeignKey(User)
    num=models.IntegerField()
    # 是否选中
    isselect = models.BooleanField(default=True)
    # 是否删除
    isdelete = models.BooleanField(default=False)
    class Meta:
        db_table='cart'

# 订单 模型类
# 一个用户 对应 多个订单
class Order(models.Model):
    user=models.ForeignKey(User)
    createtime = models.DateTimeField(auto_now_add=True)
    updatetime = models.DateTimeField(auto_now=True)
    # 状态
    # -1 过期
    # 0 未付款
    # 1 已付款，待发货
    # 2 已发货，待收货
    # 3 已收货，待评价
    # 4 已评价
    status=models.IntegerField(default=0)
    identifier=models.CharField(max_length=40)
    money=models.DecimalField(max_digits=10,decimal_places=2)

# 订单商品 模型类
# 一个订单 对应 多个商品(订单商品)

class OrderGoods(models.Model):
    order=models.ForeignKey(Order)
    #订单中的商品
    goods=models.ForeignKey(Goods)
    #订单中商品数量
    number =models.IntegerField()