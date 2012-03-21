from django.conf.urls.defaults import *

urlpatterns = patterns('twil',
    url(r'^forward$', 'api.forward'),
)