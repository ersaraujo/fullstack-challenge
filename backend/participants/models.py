from django.db import models

class Event(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Event {self.id}"
    
class Participant(models.Model):
    event = models.ForeignKey(Event, related_name='participants',on_delete=models.CASCADE)
    first_name = models.CharField(max_length=10)
    last_name = models.CharField(max_length=10)
    participation = models.FloatField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}- {self.participation}"