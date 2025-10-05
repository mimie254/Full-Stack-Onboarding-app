from django.db import models


class DynamicForm(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title


FIELD_TYPES = [
    ('text', 'Text'),
    ('number', 'Number'),
    ('file', 'File'),
]


class FormField(models.Model):
    form = models.ForeignKey(
        DynamicForm,
        related_name="fields",
        on_delete=models.CASCADE
    )
    label = models.CharField(max_length=255)
    field_type = models.CharField(max_length=20, choices=FIELD_TYPES)
    required = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.label} ({self.field_type})"


class Submission(models.Model):
    form = models.ForeignKey(
        DynamicForm,
        on_delete=models.CASCADE,
        related_name="submissions",
        null=True,       # ✅ allows migration without default
        blank=True
    )
    data = models.JSONField(default=dict)  # ✅ stores answers dynamically
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission for {self.form.title if self.form else 'Unknown Form'} at {self.created_at}"
