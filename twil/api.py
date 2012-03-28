from vortex.models import *
from django.contrib.auth.models import User

from twilio.rest import TwilioRestClient

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.context_processors import csrf
from django.views.decorators.http import require_POST

import json
import urllib
import urllib2
import cgi

try:
    from local_settings import *
except ImportError:
    pass
tc = TwilioRestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

@csrf_exempt
@require_POST
def forward(request):
    phone = request.POST['From']
    body = cgi.escape(request.POST['Body'])
    
    # find the user this phone number belongs to
    try:
        user = User.objects.get(userprofile__phone=phone)
    except User.DoesNotExist:
        res = { "success": False, "error": "No user found with this phone number." }
        return HttpResponse(json.dumps(res))
    
    # break apart body at newlines
    text_bodies = ["hey whats happening","oh not much","idk"]
    
    # save each Text with the without a corresponding conversation but with an author being user
    for text_body in text_bodies:
        text = Text(author=user, author_name=user.username, body=text_body)
        # text.save()
    
    # send reply
    # sms = tc.sms.messages.create(to=phone, from_=TWILIO_NUMBER, body="lol you're funny!")
    
    return HttpResponse("")