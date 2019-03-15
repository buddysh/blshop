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