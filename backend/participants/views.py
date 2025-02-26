from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Participant
from .serializers import ParticipantSerializer

class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer

@api_view(['POST'])
def add_participant(request):
    if request.method == 'POST':
        data = request.data

        name = data.get('name')
        surname = data.get('surname')
        participation = data.get('participation')

        participant, created = Participant.objects.get_or_create(
            name=name, surname=surname, defaults={'participation': participation}
        )

        if not created:
            participant.participation += participation
            participant.save()

        serializer = ParticipantSerializer(participant)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)