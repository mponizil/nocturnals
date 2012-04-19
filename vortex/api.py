from vortex.models import *
from django.db.models import Q

from tastypie import fields
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS

class ConversationAuthorization(Authorization):
    def apply_limits(self, request, object_list):
        if request is None:
            return object_list
        public = request.GET.get("public", None)
        author = request.GET.get("author", None)
        council_members = request.GET.get("council_members", None)
        if author is None and council_members is None and len(object_list) > 1:
            object_list = object_list.filter(Q(author=request.user.id) | Q(council_members=request.user.id) | Q(public=True))
        if author is not None and council_members is None:
            if int(author) != request.user.id:
                object_list = object_list.filter(Q(council_members=request.user) | Q(public=True))
        if council_members is not None and author is None:
            if int(council_members) != request.user.id:
                object_list = object_list.filter(Q(author=request.user) | Q(public=True))
        if author is not None and council_members is not None:
            if int(author) != request.user.id and int(council_members) != request.user.id:
                object_list = object_list.filter(public=True)
        return object_list

class ConversationResource(ModelResource):
    author = fields.ForeignKey('accounts.api.UserResource', 'author', full=True)
    texts = fields.ToManyField('vortex.api.TextResource', 'texts', null=True)
    comments = fields.ToManyField('vortex.api.CommentResource', 'comments', null=True)
    council_members = fields.ToManyField('accounts.api.UserResource', 'council_members', full=True, null=True)
    
    class Meta:
        queryset = Conversation.objects.all()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post', 'put', 'delete']
        resource_name = 'conversation'
        filtering = {
            'public': ALL,
            'author': ALL_WITH_RELATIONS,
            'council_members': ALL_WITH_RELATIONS
        }
        authentication = Authentication()
        authorization = ConversationAuthorization()

class TextResource(ModelResource):
    author = fields.ForeignKey('accounts.api.UserResource', 'author', null=True, full=True)
    conversation = fields.ForeignKey('vortex.api.ConversationResource', 'conversation')
    
    class Meta:
        queryset = Text.objects.all()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post', 'put', 'delete']
        resource_name = 'text'
        filtering = {
            'conversation': ALL_WITH_RELATIONS
        }
        authentication = Authentication()
        authorization = Authorization()

class CommentResource(ModelResource):
    conversation = fields.ForeignKey('vortex.api.ConversationResource', 'conversation')
    author = fields.ForeignKey('accounts.api.UserResource', 'author', null=True, full=True)
    
    class Meta:
        queryset = Comment.objects.all()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get', 'post', 'put', 'delete']
        resource_name = 'comment'
        filtering = {
            'conversation': ALL_WITH_RELATIONS
        }
        authentication = Authentication()
        authorization = Authorization()