from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from vortex.models import *

class ConversationResource(ModelResource):
    author = fields.ForeignKey('accounts.api.UserResource', 'author', full=True)
    texts = fields.ToManyField('vortex.api.TextResource', 'texts')
    comments = fields.ToManyField('vortex.api.CommentResource', 'comments')
    
    class Meta:
        queryset = Conversation.objects.all()
        resource_name = 'conversation'
        filtering = {
            'author': ALL_WITH_RELATIONS
        }

class TextResource(ModelResource):
    conversation = fields.ForeignKey('vortex.api.ConversationResource', 'conversation')
    
    class Meta:
        queryset = Text.objects.all()
        resource_name = 'text'
        filtering = {
            'conversation': ALL_WITH_RELATIONS
        }

class CommentResource(ModelResource):
    conversation = fields.ForeignKey('vortex.api.ConversationResource', 'conversation')
    author = fields.ForeignKey('accounts.api.UserResource', 'author')
    
    class Meta:
        queryset = Comment.objects.all()
        resource_name = 'comment'