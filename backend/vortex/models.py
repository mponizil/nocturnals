from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

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
        return self.author.username + ": " + self.target[:40]

class Text(models.Model):
    date_created = models.DateTimeField()
    conversation = models.ForeignKey(Conversation, verbose_name="conversation this text belongs to", related_name="texts")
    user_author = models.ForeignKey(User, verbose_name="author as a user object", related_name="texts", null=True, blank=True)
    author = models.CharField(max_length=255, verbose_name="author name as a string")
    body = models.TextField()
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        super(Text, self).save()
    
    def __unicode__(self):
        return self.author + ": " + self.body[:40]

class Comment(models.Model):
    date_created = models.DateTimeField()
    conversation = models.ForeignKey(Conversation, verbose_name="conversation this comment is on", related_name="comments")
    author = models.ForeignKey(User, verbose_name="user who wrote this comment", related_name="comments")
    body = models.TextField()
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        super(Comment, self).save()
    
    def __unicode__(self):
        return self.author.username + ": " + self.body[:40]

class Council(models.Model):
    date_created = models.DateTimeField()
    title = models.CharField(max_length=255)
    members = models.ManyToManyField(User, verbose_name="users in this council", related_name="councils")
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        super(Council, self).save()
    
    def __unicode__(self):
        return self.title

class CouncilMember(models.Model):
    date_created = models.DateTimeField()
    conversation = models.ForeignKey(Conversation, verbose_name="conversation this user is a council member of", related_name="council_members")
    user = models.ForeignKey(User, verbose_name="user this council member refers to", related_name="member_of_councils")
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        super(CouncilMember, self).save()
    
    def __unicode__(self):
        return self.user.username + ": " + self.conversation.target[:40]