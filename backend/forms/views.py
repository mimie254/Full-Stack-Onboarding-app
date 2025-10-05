from rest_framework import generics
from .models import DynamicForm, Submission
from .serializers import DynamicFormSerializer, SubmissionSerializer


class DynamicFormListCreate(generics.ListCreateAPIView):
    queryset = DynamicForm.objects.all()
    serializer_class = DynamicFormSerializer


class DynamicFormDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DynamicForm.objects.all()
    serializer_class = DynamicFormSerializer


class SubmissionListCreate(generics.ListCreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
