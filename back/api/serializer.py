from rest_framework import serializers
from .models import Professor
from .models import Disciplina
from .models import Ambiente
from .models import Cursos
from .models import Turma

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = '__all__'

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'

class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        fields = '__all__'

class CursosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursos
        fields = '__all__'

class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        fields = '__all__'