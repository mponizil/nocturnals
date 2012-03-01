from django.http import HttpResponse

from django.template import RequestContext, loader
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from django.views.decorators.csrf import csrf_exempt
from django.core.context_processors import csrf
from django.views.decorators.http import require_POST

import json

@csrf_exempt
@require_POST
def init(request):
    if request.user.is_authenticated():
        loggedin = True
    else:
        loggedin = False
    
    res = { "success": True, "loggedin": loggedin }
    return HttpResponse(json.dumps(res))

@csrf_exempt
@require_POST
def register(request):
    username = request.POST['username']
    password = request.POST['password']
    
    if not username or not password:
        res = { "success": False, "error": "Please enter all the fields." }
        return HttpResponse(json.dumps(res))
    
    if User.objects.filter(username=username).count() > 0:
        res = { "success": False, "error": "The username is taken." }
        return HttpResponse(json.dumps(res))
    
    user = User.objects.create_user(username,"",password)
    user.save()
    
    auth_user = authenticate(username=username,password=password)
    login(request, auth_user)
    
    res = { "success": True, "data": { "username": username } }
    return HttpResponse(json.dumps(res))

@csrf_exempt
@require_POST
def auth(request):
    username = request.POST['username']
    password = request.POST['password']
    
    if not username or not password:
        res = { "success": False, "error": "Please enter all the fields." }
        return HttpResponse(json.dumps(res))
    
    auth_user = authenticate(username=username, password=password)
    if auth_user is not None:
        login(request, auth_user)
    else:
        res = { "success": False, "error": "Invalid login." }
        return HttpResponse(json.dumps(res))
    
    res = { "success": True, "data": { "username": username } }
    return HttpResponse(json.dumps(res))

def deauth(request):
    logout(request)
    res = { "success": True }
    return HttpResponse(json.dumps(res))