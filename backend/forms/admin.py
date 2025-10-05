from django.contrib import admin
from .models import DynamicForm, FormField, Submission


class FormFieldInline(admin.TabularInline):
    model = FormField
    extra = 1


@admin.register(DynamicForm)
class DynamicFormAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description")
    inlines = [FormFieldInline]


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ("id", "form", "created_at")
