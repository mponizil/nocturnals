from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^init$', 'advice.views.init'),
    url(r'^users/new$', 'account.views.new'),
)
