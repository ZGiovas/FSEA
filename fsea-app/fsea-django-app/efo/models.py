from django.db import models

class EFOTerm(models.Model):
    ontology_id = models.CharField(max_length=50, unique=True)
    label = models.CharField(max_length=1024)
    description = models.TextField(blank=True, null=True)
    iri = models.URLField(unique=True)
    is_obsolete = models.BooleanField(default=False)
    has_children = models.BooleanField(default=False)
    is_root = models.BooleanField(default=False)
    lang = models.CharField(max_length=10, default="en") 
    obo_id = models.CharField(max_length=255, unique=True, null=True, blank=True)

    def __str__(self):
        return self.label

class EFOSynonym(models.Model):
    synonym = models.CharField(max_length=1024, unique=True)
    terms = models.ManyToManyField(EFOTerm, related_name="synonyms")

    def __str__(self):
        return self.synonym