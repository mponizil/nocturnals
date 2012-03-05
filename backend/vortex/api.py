from django.contrib.auth.models import User
from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from vortex.models import *

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        excludes = ['email', 'password', 'is_active', 'is_staff', 'is_superuser', 'last_login']
        filtering = {
            'id': ALL
        }

class ConversationResource(ModelResource):
    author = fields.ForeignKey(UserResource, 'author', full=True)
    texts = fields.ToManyField('vortex.api.TextResource', 'texts', full=True)
    
    class Meta:
        queryset = Conversation.objects.all()
        resource_name = 'conversation'
        filtering = {
            'author': ALL_WITH_RELATIONS
        }

class TextResource(ModelResource):
    conversation = fields.ForeignKey(ConversationResource, 'conversation')
    
    class Meta:
        queryset = Text.objects.all()
        resource_name = 'text'