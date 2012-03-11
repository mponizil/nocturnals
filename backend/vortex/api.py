from tastypie import fields
from tastypie.authentication import Authentication
from tastypie.authorization import DjangoAuthorization
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
        authentication = Authentication()
        authorization = DjangoAuthorization()

    def get_object_list(self, request):
        if request.GET.get("author") is None:
            return super(ConversationResource, self).get_object_list(request).filter(public=True)
        else:
            if int(request.GET.get("author")) == request.user.id:
                return super(ConversationResource, self).get_object_list(request)
            else:
                return super(ConversationResource, self).get_object_list(request).filter(public=True)

class TextResource(ModelResource):
    # user_author = fields.ForeignKey('accounts.api.UserResource', 'user_author', full=True)
    conversation = fields.ForeignKey('vortex.api.ConversationResource', 'conversation')
    
    class Meta:
        queryset = Text.objects.all()
        resource_name = 'text'
        filtering = {
            'conversation': ALL_WITH_RELATIONS
        }
        authentication = Authentication()
        authorization = DjangoAuthorization()

class CommentResource(ModelResource):
    conversation = fields.ForeignKey('vortex.api.ConversationResource', 'conversation')
    author = fields.ForeignKey('accounts.api.UserResource', 'author')
    
    class Meta:
        queryset = Comment.objects.all()
        resource_name = 'comment'
        authentication = Authentication()
        authorization = DjangoAuthorization()