import uuid
from django.db import models


class FormTemplate(models.Model):
    """
    Stores a definition of a form (schema-based).
    Example: KYC, Loan, Investment declaration, etc.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    schema = models.JSONField()        # JSON Schema describing fields
    # Optional UI hints for rendering
    ui_schema = models.JSONField(null=True, blank=True)
    version = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class FormSubmission(models.Model):
    """
    Stores a client’s submission for a given form.
    Keeps a snapshot of the schema used at submission time.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    form = models.ForeignKey(
        FormTemplate, on_delete=models.SET_NULL, null=True, blank=True)
    # snapshot of the form schema at submission
    schema_snapshot = models.JSONField()
    data = models.JSONField()             # actual answers keyed by field IDs
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission {self.id} for {self.form.name if self.form else 'Unknown'}"


class SubmissionFile(models.Model):
    """
    Stores files uploaded with a submission.
    Each file is linked to a specific field (e.g., ID proof, pay slip).
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    submission = models.ForeignKey(
        FormSubmission, related_name="files", on_delete=models.CASCADE)
    # which field this file belongs to
    field_name = models.CharField(max_length=200)
    file = models.FileField(upload_to='submissions/%Y/%m/%d/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"File for {self.field_name} in submission {self.submission.id}"
