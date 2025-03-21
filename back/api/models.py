from django.db import models

class Professor(models.Model):
    ni = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    tel = models.CharField(max_length=255)
    ocupacao = models.FloatField()

class Disciplina(models.Model):
    disciplina = models.CharField(max_length=255)
    codigo = models.CharField(max_length=255)
    cargaHoraria = models.CharField(max_length=255)

class Ambiente(models.Model):

    PERIODO = [
    ('M', 'Manhã'),
    ('T', 'Tarde'),
    ('N', 'Noturno'),
    ('S', 'Superior')
]

    codigo = models.CharField(max_length=255)
    sala = models.CharField(max_length=255)
    capacidade = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=255)
    periodo = models.CharField(max_length=100, choices=PERIODO)

class Cursos(models.Model):

    PERIODO = [
        ('M', 'Manhã'),
        ('T', 'Tarde'),
        ('N', 'Noturno'),
        ('S', 'Superior')
    ]

    codigo = models.CharField(max_length=255)
    curso = models.CharField(max_length=255)
    tipo = models.CharField(max_length=100)
    cargaHoraria = models.CharField(max_length=255)
    sigla = models.CharField(max_length=255)

class Turma(models.Model):
    codigo = models.CharField(max_length=255)
    turma = models.CharField(max_length=255)    