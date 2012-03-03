from django.contrib import admin
from auth.models import *
from votex.models import *

admin.site.register(UserProfile)
admin.site.register(Conversation)
admin.site.register(Text)
admin.site.register(Comment)
admin.site.register(Council)
admin.site.register(CouncilMember)