# encoding: utf-8
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models

class Migration(SchemaMigration):

    def forwards(self, orm):
        
        # Adding model 'Conversation'
        db.create_table('vortex_conversation', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')()),
            ('author', self.gf('django.db.models.fields.related.ForeignKey')(related_name='conversations', to=orm['auth.UserProfile'])),
            ('context', self.gf('django.db.models.fields.TextField')(blank=True)),
            ('target', self.gf('django.db.models.fields.CharField')(max_length=255, blank=True)),
            ('private', self.gf('django.db.models.fields.BooleanField')(default=True)),
        ))
        db.send_create_signal('vortex', ['Conversation'])

        # Adding model 'Text'
        db.create_table('vortex_text', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')()),
            ('conversation', self.gf('django.db.models.fields.related.ForeignKey')(related_name='texts', to=orm['vortex.Conversation'])),
            ('user_author', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='texts', null=True, to=orm['auth.UserProfile'])),
            ('author', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('body', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal('vortex', ['Text'])

        # Adding model 'Comment'
        db.create_table('vortex_comment', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')()),
            ('conversation', self.gf('django.db.models.fields.related.ForeignKey')(related_name='comments', to=orm['vortex.Conversation'])),
            ('text', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='comments', null=True, to=orm['vortex.Text'])),
            ('author', self.gf('django.db.models.fields.related.ForeignKey')(related_name='comments', to=orm['auth.UserProfile'])),
            ('body', self.gf('django.db.models.fields.TextField')()),
        ))
        db.send_create_signal('vortex', ['Comment'])

        # Adding model 'Council'
        db.create_table('vortex_council', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')()),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=255)),
        ))
        db.send_create_signal('vortex', ['Council'])

        # Adding M2M table for field members on 'Council'
        db.create_table('vortex_council_members', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('council', models.ForeignKey(orm['vortex.council'], null=False)),
            ('userprofile', models.ForeignKey(orm['auth.userprofile'], null=False))
        ))
        db.create_unique('vortex_council_members', ['council_id', 'userprofile_id'])

        # Adding model 'CouncilMember'
        db.create_table('vortex_councilmember', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')()),
            ('conversation', self.gf('django.db.models.fields.related.ForeignKey')(related_name='council_members', to=orm['vortex.Conversation'])),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(related_name='member_of_councils', to=orm['auth.UserProfile'])),
        ))
        db.send_create_signal('vortex', ['CouncilMember'])


    def backwards(self, orm):
        
        # Deleting model 'Conversation'
        db.delete_table('vortex_conversation')

        # Deleting model 'Text'
        db.delete_table('vortex_text')

        # Deleting model 'Comment'
        db.delete_table('vortex_comment')

        # Deleting model 'Council'
        db.delete_table('vortex_council')

        # Removing M2M table for field members on 'Council'
        db.delete_table('vortex_council_members')

        # Deleting model 'CouncilMember'
        db.delete_table('vortex_councilmember')


    models = {
        'auth.group': {
            'Meta': {'object_name': 'Group'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        'auth.permission': {
            'Meta': {'ordering': "('content_type__app_label', 'content_type__model', 'codename')", 'unique_together': "(('content_type', 'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        'auth.userprofile': {
            'Meta': {'object_name': 'UserProfile'},
            'friends': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'friends_rel_+'", 'to': "orm['auth.UserProfile']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['auth.User']", 'unique': 'True'})
        },
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'vortex.comment': {
            'Meta': {'object_name': 'Comment'},
            'author': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'comments'", 'to': "orm['auth.UserProfile']"}),
            'body': ('django.db.models.fields.TextField', [], {}),
            'conversation': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'comments'", 'to': "orm['vortex.Conversation']"}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'text': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'comments'", 'null': 'True', 'to': "orm['vortex.Text']"})
        },
        'vortex.conversation': {
            'Meta': {'object_name': 'Conversation'},
            'author': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'conversations'", 'to': "orm['auth.UserProfile']"}),
            'context': ('django.db.models.fields.TextField', [], {'blank': 'True'}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'private': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'target': ('django.db.models.fields.CharField', [], {'max_length': '255', 'blank': 'True'})
        },
        'vortex.council': {
            'Meta': {'object_name': 'Council'},
            'date_created': ('django.db.models.fields.DateTimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'members': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'councils'", 'symmetrical': 'False', 'to': "orm['auth.UserProfile']"}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
        'vortex.councilmember': {
            'Meta': {'object_name': 'CouncilMember'},
            'conversation': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'council_members'", 'to': "orm['vortex.Conversation']"}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'member_of_councils'", 'to': "orm['auth.UserProfile']"})
        },
        'vortex.text': {
            'Meta': {'object_name': 'Text'},
            'author': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'body': ('django.db.models.fields.TextField', [], {}),
            'conversation': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'texts'", 'to': "orm['vortex.Conversation']"}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user_author': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'texts'", 'null': 'True', 'to': "orm['auth.UserProfile']"})
        }
    }

    complete_apps = ['vortex']
