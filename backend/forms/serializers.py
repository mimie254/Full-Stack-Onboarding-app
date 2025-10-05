from rest_framework import serializers
from .models import DynamicForm, FormField, Submission


class FormFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormField
        fields = ['id', 'label', 'field_type', 'required']


class DynamicFormSerializer(serializers.ModelSerializer):
    fields = FormFieldSerializer(many=True)

    class Meta:
        model = DynamicForm
        fields = ['id', 'title', 'description', 'fields']

    def create(self, validated_data):
        fields_data = validated_data.pop('fields')
        form = DynamicForm.objects.create(**validated_data)
        for field_data in fields_data:
            FormField.objects.create(form=form, **field_data)
        return form


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'form', 'data']   # only these three
