from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import EFOTerm
from .serializers import EFOTermSerializer

class CustomPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = "page_size" 

    def get_paginated_response(self, data):
        return Response({
            "total_count": self.page.paginator.count,
            "total_pages": self.page.paginator.num_pages, 
            "current_page": self.page.number, 
            "page_size": self.page.paginator.per_page,
            "results": data 
        })

class EFOTermList(generics.ListAPIView):
    queryset = EFOTerm.objects.all()
    serializer_class = EFOTermSerializer
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter] 
    filterset_fields = ['is_obsolete', 'has_children', 'is_root', 'lang'] 
    ordering_fields = ['ontology_id','label', 'description', 'obo_id']
    search_fields = ['ontology_id', 'label', 'description', 'obo_id', 'synonyms__synonym']

class EFOTermDetail(generics.RetrieveAPIView):
    queryset = EFOTerm.objects.all()
    serializer_class = EFOTermSerializer
    lookup_field = "ontology_id"
