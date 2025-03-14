from django.urls import path
from .views import listar_professores, ProfessoresView, ProfessoresDetailView, DisciplinasDetailView, DisciplinaView
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
]

