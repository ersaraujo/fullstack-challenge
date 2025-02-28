from django.test import TestCase
from participants.models import Participant
from django.core.exceptions import ValidationError

# Create your tests here.
class ParticipantModelTest(TestCase):

    def test_first_name_contains_numbers(self):
        participant = Participant(first_name="John123", last_name="Doe", participation=80.5)
        with self.assertRaises(ValidationError):
            participant.full_clean()  # Isso irá chamar o método clean() e validar o modelo.

    def test_last_name_contains_numbers(self):
        participant = Participant(first_name="John", last_name="Doe123", participation=80.5)
        with self.assertRaises(ValidationError):
            participant.full_clean()  # Isso irá chamar o método clean() e validar o modelo.

    def test_valid_participant(self):
        participant = Participant(first_name="John", last_name="Doe", participation=80.5)
        try:
            participant.full_clean()  # Validação bem-sucedida
        except ValidationError:
            self.fail("Participant should be valid!")