from django.urls import include, path
from .views import EFOTermList, EFOTermDetail

urlpatterns = [
    path("terms/", EFOTermList.as_view(), name="efo-term-list"),
    path("terms/<str:ontology_id>/", EFOTermDetail.as_view(), name="efo-term-detail"),
]