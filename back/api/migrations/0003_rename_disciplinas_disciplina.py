# Generated by Django 5.1 on 2025-03-19 17:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_disciplinas'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Disciplinas',
            new_name='Disciplina',
        ),
    ]
