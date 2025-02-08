from rest_framework import generics
from .models import EFOTerm
from .serializers import EFOTermSerializer

class EFOTermList(generics.ListAPIView):
    queryset = EFOTerm.objects.all()
    serializer_class = EFOTermSerializer

class EFOTermDetail(generics.RetrieveAPIView):
    queryset = EFOTerm.objects.all()
    serializer_class = EFOTermSerializer
    lookup_field = "ontology_id"
