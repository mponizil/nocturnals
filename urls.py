from django.conf.urls.defaults import *

from django.contrib import admin
admin.autodiscover()

from tastypie.api import Api
from accounts.api import *
from vortex.api import *
from twil.api import *

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(ConversationResource())
v1_api.register(TextResource())
v1_api.register(CommentResource())

urlpatterns = patterns('',
    (r'^auth/', include('accounts.urls')),
    (r'^vortex/', include('vortex.urls')),
    (r'^twil/', include('twil.urls')),
    
    (r'^api/', include(v1_api.urls)),

    (r'^admin/', include(admin.site.urls)),
)
