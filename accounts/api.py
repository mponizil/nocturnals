from django.contrib.auth.models import User
from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS

from django.http import HttpResponse
from django.db import IntegrityError

from django.template import RequestContext, loader
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from django.views.decorators.csrf import csrf_exempt
from django.core.context_processors import csrf
from django.views.decorators.http import require_POST

import json

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        excludes = ['email', 'password', 'is_active', 'is_staff', 'is_superuser', 'last_login']
        filtering = {
            'id': ALL
        }

@csrf_exempt
@require_POST
def init(request):
    if request.user.is_authenticated():
        logged_in = True
        user = {
            "id": request.user.id,
            "username": request.user.username,
            "gender": request.user.userprofile.get_gender_display()
        }
    else:
        logged_in = False
        user = {}
    
    res = {
        "success": True,
        "data": {
            "logged_in": logged_in,
            "user": user
        }
    }
    return HttpResponse(json.dumps(res))

@csrf_exempt
@require_POST
def register(request):
    username = request.POST['username']
    password = request.POST['password']
    gender = request.POST['gender']
    
    if not username or not password:
        res = { "success": False, "error": "Please enter all the fields." }
        return HttpResponse(json.dumps(res))
    
    try:
        new_user = User.objects.create_user(username,"",password)
    except IntegrityError as error:
        res = { "success": False, "error": "The username is taken." }
        return HttpResponse(json.dumps(res))
    
    new_user.save()
    new_user.userprofile.gender = gender
    new_user.userprofile.save()
    
    user = authenticate(username=username,password=password)
    login(request, user)
    
    res = {
        "success": True,
        "data": {
            "user": {
                "id": user.id,
                "username": username,
                "gender": user.userprofile.get_gender_display()
            }
        }
    }
    return HttpResponse(json.dumps(res))

@csrf_exempt
@require_POST
def auth(request):
    username = request.POST['username']
    password = request.POST['password']
    
    if not username or not password:
        res = { "success": False, "error": "Please enter all the fields." }
        return HttpResponse(json.dumps(res))
    
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
    else:
        res = { "success": False, "error": "Invalid login." }
        return HttpResponse(json.dumps(res))
    
    res = {
        "success": True,
        "data": {
            "user": {
                "id": user.id,
                "username": username,
                "gender": user.userprofile.get_gender_display()
            }
        }
    }
    return HttpResponse(json.dumps(res))

def deauth(request):
    logout(request)
    res = { "success": True }
    return HttpResponse(json.dumps(res))

def search(request):
    q = request.GET.get("q", None)
    users = User.objects.filter(username__contains=q)
    res = []
    for user in users:
        res.append({
            "id": user.id,
            "username": user.username
        })
    return HttpResponse(json.dumps(res))