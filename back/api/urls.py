from django.urls import path
from .views import listar_professores, ProfessoresView, ProfessoresDetailView, DisciplinasDetailView, DisciplinaView, AmbienteView, AmbienteDetailView, CursosView, CursosDetailView,get_tipo_curso_choices, TurmaView, TurmaDetailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('professor/<int:pk>', ProfessoresDetailView.as_view()),
    path('professor', ProfessoresDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('disciplina', DisciplinaView.as_view()),
    path('disciplinas/<int:pk>', DisciplinasDetailView.as_view()),
    path('ambiente', AmbienteView.as_view()),
    path('ambiente/<int:pk>', AmbienteDetailView.as_view()),
    path('cursos', CursosView.as_view()),
    path('cursos/<int:pk>', CursosDetailView.as_view()),
    path('tipo_curso_choices', (get_tipo_curso_choices)),
    path('turma', TurmaView.as_view()),
    path('turma/<int:pk>', TurmaDetailView.as_view()),
]

