from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from vortex.models import *

class ConversationResource(ModelResource):
    author = fields.ForeignKey('accounts.api.UserResource', 'author', full=True)
    texts = fields.ToManyField('vortex.api.TextResource', 'texts')
    
    class Meta:
        queryset = Conversation.objects.all()
        resource_name = 'conversation'
        filtering = {
            'author': ALL_WITH_RELATIONS
        }

class TextResource(ModelResource):
    conversation = fields.ForeignKey(ConversationResource, 'conversation', full=True)
    
    class Meta:
        queryset = Text.objects.all()
        resource_name = 'text'