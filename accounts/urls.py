from django.conf.urls.defaults import *

urlpatterns = patterns('accounts',
    url(r'^init$', 'api.init'),
    url(r'^register$', 'api.register'),
    url(r'^login$', 'api.auth'),
    url(r'^logout$', 'api.deauth'),
    url(r'^search$', 'api.search'),
)