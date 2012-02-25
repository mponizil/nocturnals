from django.db import models
from datetime import datetime

# python manage.py schemamigration vortex --initial
# python manage.py schemamigration vortex --auto
# python manage.py migrate

# class Conversation(models.Model):
#     date_created = models.DateTimeField()
#     
#     def save(self):
#         if self.date_created == None:
#           self.date_created = datetime.now()
#         super(Conversation, self).save()
#     
#     def __unicode__(self):
#         return str(self.id)