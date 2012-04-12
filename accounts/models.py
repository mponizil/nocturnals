from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

GENDERS = (
    (u'F', u'Female'),
    (u'M', u'Male'),
)

class UserProfile(models.Model):
    user = models.OneToOneField(User, unique=True)
    gender = models.CharField(max_length=1, choices=GENDERS, default=u'M')
    friends = models.ManyToManyField("self", related_name="friends", null=True, blank=True)
    phone = models.CharField(max_length=12, null=True, blank=True)
    
    def __unicode__(self):
        return str(self.user.username)

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)