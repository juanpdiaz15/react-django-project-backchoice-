from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import MetricSerializer, DimensionSerializer, FrameworkSerializer, ProjectSerializer, UserSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Metric, Dimension, Framework, Project
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount import signals
from allauth.socialaccount.adapter import get_adapter as get_social_adapter
from allauth.account.adapter import get_adapter
from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
   
class UserProjectListView(APIView):

    def get(self, request):
        user = request.user
        projects = Project.objects.filter(user=user)
        serializer = DimensionSerializer(projects, many=True)
        return Response(serializer.data)
    
# Vistas para Metric
class MetricListCreate(generics.ListCreateAPIView):
    queryset = Metric.objects.all()
    serializer_class = MetricSerializer
    
class MetricRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Metric.objects.all()
    serializer_class = MetricSerializer

# Vistas para Dimension
class DimensionListCreate(generics.ListCreateAPIView):
    queryset = Dimension.objects.all()
    serializer_class = DimensionSerializer

class DimensionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dimension.objects.all()
    serializer_class = DimensionSerializer

# Vistas para Framework
class FrameworkListCreate(generics.ListCreateAPIView):
    queryset = Framework.objects.all()
    serializer_class = FrameworkSerializer
    
class FrameworkRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Framework.objects.all()
    serializer_class = FrameworkSerializer

# Vistas para Project
class ProjectListCreate(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
class ProjectRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# Vista para generar reportes
class GenerateReportView(APIView):
    def calculate_dimension_weight(self, dimension):
        total_value = sum(metric['value'] for metric in dimension['metrics'])
        average_value = total_value / len(dimension['metrics'])
        return average_value * dimension['weight']
    
    def generate_report(self, frameworks):
        metrics = [d['name'] for d in frameworks[0]['dimensions']]
        framework_names = [f['name'] for f in frameworks]
        weights = [d['weight'] for d in frameworks[0]['dimensions']]

        data = []
        for metric_index, metric_name in enumerate(metrics):
            row = {'metric': metric_name, 'weight': weights[metric_index]}
            for framework in frameworks:
                dimension = next(d for d in framework['dimensions'] if d['name'] == metric_name)
                row[framework['name']] = self.calculate_dimension_weight(dimension)
            data.append(row)

        # Calcular el puntaje final para cada framework
        final_scores = []
        for framework in frameworks:
            total_weighted_score = sum(
                self.calculate_dimension_weight(dimension) for dimension in framework['dimensions']
            )
            final_scores.append({
                'name': framework['name'],
                'score': total_weighted_score
            })

        # Ordenar los puntajes finales de mayor a menor
        final_scores.sort(key=lambda x: x['score'], reverse=True)

        return {
            'data': data,
            'finalScores': final_scores,
            'bestFramework': final_scores[0]['name']
        }

    def post(self, request, *args, **kwargs):
        frameworks = request.data.get('frameworks', [])
        project_name = request.data.get('projectName', '')
        project_description = request.data.get('projectDescription', '')

        if not frameworks or not project_name or not project_description:
            return Response(
                {"message": "Faltan datos requeridos para generar el reporte."},
                status=status.HTTP_400_BAD_REQUEST
            )

        report_data = self.generate_report(frameworks)
        report_data['projectName'] = project_name
        report_data['projectDescription'] = project_description

        return Response(report_data, status=status.HTTP_200_OK)

