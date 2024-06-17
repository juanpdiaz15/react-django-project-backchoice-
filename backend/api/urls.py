from django.urls import path
from . import views

urlpatterns = [
   path('dimensions/', views.DimensionListCreate.as_view(), name='dimension-list-create'),
    path('dimensions/<int:pk>/', views.DimensionRetrieveUpdateDestroy.as_view(), name='dimension-detail'),
    path('metrics/', views.MetricListCreate.as_view(), name='metric-list-create'),
    path('metrics/<int:pk>/', views.MetricRetrieveUpdateDestroy.as_view(), name='metric-detail'),
    path('framework/', views.FrameworkListCreate.as_view(), name='framework-list-create'),
    path('framework/<int:pk>/', views.FrameworkRetrieveUpdateDestroy.as_view(), name='framework-detail'),
    path('project/', views.ProjectListCreate.as_view(), name='project-list-create'),
    path('project/<int:pk>/', views.ProjectRetrieveUpdateDestroy.as_view(), name='project-detail'),
    path('generate-report/', views.GenerateReportView.as_view(), name='generate-report'),
    path('users/', views.CreateUserView.as_view(), name='create-user'),
   
   ]
