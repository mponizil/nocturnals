from django.conf.urls.defaults import *

urlpatterns = patterns('vortex',
    url(r'^me/conversations$', 'api.my_conversations'),
    url(r'^conversation/([\d]+)$', 'api.conversation'),
)