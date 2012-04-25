from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

GENDERS = (
    (u'F', u'Female'),
    (u'M', u'Male'),
)

class Conversation(models.Model):
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    author = models.ForeignKey(User, verbose_name="user who created this conversation", related_name="conversations")
    context = models.TextField(blank=True)
    target = models.CharField(max_length=255)
    gender = models.CharField(max_length=1, choices=GENDERS, default=u'F')
    public = models.BooleanField(default=False)
    council_members = models.ManyToManyField(User, verbose_name="council members", related_name="councils_of")
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        self.date_modified = datetime.now()
        super(Conversation, self).save()
    
    def __unicode__(self):
        return self.author.username + ": " + self.target[:40]

class Text(models.Model):
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    conversation = models.ForeignKey(Conversation, verbose_name="conversation this text belongs to", related_name="texts", null=True, blank=True)
    author = models.ForeignKey(User, verbose_name="author as a user object", related_name="texts", null=True, blank=True)
    author_name = models.CharField(max_length=255, verbose_name="author name as a string")
    body = models.TextField()
    
    def save(self):
        if self.date_created == None:
          self.date_created = datetime.now()
        self.date_modified = datetime.now()
        super(Text, self).save()
    
    def __unicode__(self):
        return self.author_name + ": " + self.body[:40]

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