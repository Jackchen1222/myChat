# -*- coding:utf-8 -*-
from django.shortcuts import render
import os
import json
from django.conf import settings
from django.http import HttpResponse, JsonResponse

from .models import UserIdentity
from .chatInterface.UserLogin import *


def homeIndex(request):
    return render(request, 'login_interface.html')

def tempIndex(request):
    return render(request, 'jump.html')

def loginIndex(request):
    LoginIndexResultName = 'result'
    LoginIndexReasonName = 'reason'
    retstr = {}
    TypeLogin = '0'
    TypeRegister = '1'
    if request.method == 'POST':
        print(request.POST.get(JSAccountName), ',',
              request.POST.get(JSPasswordName), ',',
              request.POST.get(JSLoginTypeName), )
        logintype = request.POST.get(JSLoginTypeName)
        if logintype == TypeLogin:
            act = request.POST.get(JSAccountName)
            pwd = request.POST.get(JSPasswordName)

            retstr[LoginIndexResultName] = ResultFailed
            retstr[LoginIndexReasonName] = FaileReasonInexistence

            matchResult = UserIdentity.objects.filter(account=act)

            for each in matchResult:
                if each.account == act and each.password == pwd:
                    retstr[LoginIndexResultName] = ResultSuccess
                    retstr[LoginIndexReasonName] = SuccessReason
                    return JsonResponse(retstr)
            return JsonResponse(retstr)
        elif logintype == TypeRegister:
            account = request.POST.get(JSAccountName)
            password = request.POST.get(JSPasswordName)
            newUserRet = UserIdentity.objects.get_or_create(account=account,password=password)
            print(newUserRet, type(newUserRet), newUserRet[1])
            if bool(newUserRet[1]):
                retstr[LoginIndexResultName] = ResultSuccess
                retstr[LoginIndexReasonName] = SuccessReason
            else:
                retstr[LoginIndexResultName] = ResultFailed
                retstr[LoginIndexReasonName] = FaileReasonExist

            return JsonResponse(retstr)
    else:
        print("hello,world")