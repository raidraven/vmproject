# Generated by Django 3.1.5 on 2022-03-13 02:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vmpost', '0002_datamodel'),
    ]

    operations = [
        migrations.RenameField(
            model_name='datamodel',
            old_name='catedory',
            new_name='category',
        ),
    ]
