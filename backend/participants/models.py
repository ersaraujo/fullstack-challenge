from django.db import models
from django.core.exceptions import ValidationError

class Participant(models.Model):
    first_name = models.CharField(max_length=10)
    last_name = models.CharField(max_length=10)
    participation = models.FloatField()

    def clean(self):
        if any(char.isdigit() for char in self.first_name):
            raise ValidationError({'first_name': 'First name cannot contain numbers.'})

        if any(char.isdigit() for char in self.last_name):
            raise ValidationError({'last_name': 'Last name cannot contain numbers.'})

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.participation}"
