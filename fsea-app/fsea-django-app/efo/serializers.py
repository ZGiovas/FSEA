from rest_framework import serializers
from .models import EFOTerm, EFOSynonym

class EFOSynonymSerializer(serializers.ModelSerializer):
    class Meta:
        model = EFOSynonym
        fields = ["synonym"]

class EFOTermSerializer(serializers.ModelSerializer):
    synonyms = EFOSynonymSerializer(many=True, read_only=True)

    class Meta:
        model = EFOTerm
        fields = [
            "ontology_id", 
            "label", 
            "description", 
            "iri", 
            "is_obsolete",
            "has_children",
            "is_root",
            "lang",
            "obo_id",
            "synonyms"
        ]