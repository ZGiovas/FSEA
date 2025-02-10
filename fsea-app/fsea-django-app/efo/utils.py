import requests
from efo.models import EFOTerm, EFOSynonym

OLS_EFO_URL = "https://www.ebi.ac.uk/ols/api/ontologies/efo/terms"

def fetch_efo_terms(max_pages=None):
    print('Fetching started')
    next_page_url = OLS_EFO_URL
    fetched_ids = set()
    page_count = 0 # Use page_count to limit pages for development reasons

    while next_page_url and (max_pages is None or page_count < max_pages):
      response = requests.get(next_page_url, params={"size": 1000}) 

      if response.status_code != 200:
        print("Sync error with code:", response.status_code)
        return

      data = response.json()
      page_count += 1 

      for term_data in data["_embedded"]["terms"]:
        ontology_id = term_data["obo_id"]
        description = ""

        fetched_ids.add(ontology_id)

        # Handle description in case of empty 
        if "description" in term_data and isinstance(term_data["description"], list) and term_data["description"]:
            description = term_data["description"][0]

        term, created = EFOTerm.objects.update_or_create(
            ontology_id=ontology_id,
            defaults={
                "label": term_data["label"],
                "description": description,
                "iri": term_data["iri"],
                'is_obsolete': term_data["is_obsolete"],
                'has_children': term_data["has_children"],
                'is_root': term_data["is_root"],
                'lang': term_data["lang"],
                'obo_id': term_data["obo_id"],
            }
        )

        for synonym_text in term_data.get("synonyms", []):
            synonym, _ = EFOSynonym.objects.get_or_create(synonym=synonym_text)
            synonym.terms.add(term) 

      print("Synced Successfully for page: ", next_page_url)
      next_page_url = data["_links"].get("next", {}).get("href", None)

    deleted_count, _ = EFOTerm.objects.exclude(ontology_id__in=fetched_ids).delete()
    print(f"Removed {deleted_count} outdated terms") 
    print("Synced Successfully")

          
