from django.contrib import admin

from .models import UserIdentity
# Register your models here.

class UserIdentityTable(admin.ModelAdmin):
    list_display = ('account', 'password', 'register_time', 'update_time',)

admin.site.register(UserIdentity, UserIdentityTable)