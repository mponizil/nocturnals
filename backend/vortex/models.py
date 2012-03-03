from django.db import models
from datetime import datetime
from accounts.models import UserProfile as User

# python manage.py schemamigration vortex --initial
# python manage.py schemamigration vortex --auto
# python manage.py migrate

class Conversation(models.Model):
    date_created = models.DateTimeField()
    author = models.ForeignKey(User, verbose_name="user who created this conversation", related_name="conversations")
    context = models.TextField(blank=True)
    target = models.CharField(max_length=255, blank=True)
    private = models.BooleanField(default=True)
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        super(Conversation, self).save()
    
    def __unicode__(self):
        return str(self.author.username + ": " + self.id)

class Text(models.Model):
    date_created = models.DateTimeField()
    conversation = models.ForeignKey(Conversation, verbose_name="conversation this text belongs to", related_name="texts")
    user_author = models.ForeignKey(User, verbose_name="author as a user object", related_name="texts", null=True, blank=True)
    author = models.CharField(max_length=255, verbose_name="author name as a string")
    body = models.TextField()
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        super(Conversation, self).save()
    
    def __unicode__(self):
        return str(self.body)[:20]

class Comment(models.Model):
    date_created = models.DateTimeField()
    conversation = models.ForeignKey(Conversation, verbose_name="conversation this comment is on", related_name="comments")
    text = models.ForeignKey(Text, verbose_name="individual text this comment is on", related_name="comments", null=True, blank=True)
    author = models.ForeignKey(User, verbose_name="user who wrote this comment", related_name="comments")
    body = models.TextField()
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        super(Conversation, self).save()
    
    def __unicode__(self):
        return str(self.body)[:20]

class Council(models.Model):
    date_created = models.DateTimeField()
    title = models.CharField(max_length=255)
    members = models.ManyToManyField(User, verbose_name="users in this council", related_name="councils")
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        super(Conversation, self).save()
    
    def __unicode__(self):
        return str(self.title)

class CouncilMember(models.Model):
    date_created = models.DateTimeField()
    conversation = models.ForeignKey(Conversation, verbose_name="conversation this user is a council member of", related_name="council_members")
    user = models.ForeignKey(User, verbose_name="user this council member refers to", related_name="member_of_councils")
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        super(Conversation, self).save()
    
    def __unicode__(self):
        return str(self.user.username + ": " + self.conversation.id)