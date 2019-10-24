from django.db import models

# Create your models here.

class UserIdentity(models.Model):
    account = models.CharField(u'账号', max_length=64)
    password = models.CharField(u'密码', max_length=64)
    register_time = models.DateTimeField('注册时间', auto_now_add=True, editable=True)
    update_time = models.DateTimeField('修改时间', auto_now=True, null=True )

    def __str__(self):
        return self.account
