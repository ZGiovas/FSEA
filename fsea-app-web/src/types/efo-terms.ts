export interface EFOTerm {
  id: number;
  ontology_id: string;
  label: string;
  description?: string | null;
  iri: string;
  is_obsolete: boolean;
  has_children: boolean;
  is_root: boolean;
  lang: string;
  obo_id?: string | null;
  synonyms?: EFOSynonym[];
}

export interface EFOSynonym {
  id: number;
  synonym: string;
  terms: EFOTerm[];
}

export interface PaginatedEFOTermsResponse {
  total_count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  results: EFOTerm[];
}
