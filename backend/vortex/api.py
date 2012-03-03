from accounts.models import *
from vortex.models import *

from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
from django.core.context_processors import csrf
from django.views.decorators.http import require_POST

from django.core import serializers
import json

def my_conversations(request):
    conversations = Conversation.objects.filter(author=request.user)
    res = serializers.serialize("json", conversations)
    return HttpResponse(res)

def conversation(request, id):
    conversation = Conversation.objects.get(id=id)
    res = serializers.serialize("json", [conversation])
    return HttpResponse(res)