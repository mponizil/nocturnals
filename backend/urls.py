from django.conf.urls.defaults import *
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^auth/', include('auth.urls')),
    url(r'^vortex/', include('vortex.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
