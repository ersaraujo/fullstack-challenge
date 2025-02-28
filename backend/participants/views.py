from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Event, Participant
from .serializers import EventSerializer, ParticipantSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    @action(detail=True, methods=['get'])
    def participants(self, request, pk=None):
        event = self.get_object()
        participants = event.participants.all()
        serializer = ParticipantSerializer(participants, many=True)
        return Response(serializer.data)

class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer