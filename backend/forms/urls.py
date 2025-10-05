from django.urls import path
from . import views

urlpatterns = [
    path('forms/', views.DynamicFormListCreate.as_view(), name='form-list-create'),
    path('forms/<int:pk>/', views.DynamicFormDetail.as_view(), name='form-detail'),
    path('submissions/', views.SubmissionListCreate.as_view(),
         name='submission-list-create'),
]
