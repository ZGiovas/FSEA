import { TableProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';

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

export type TablePaginationConfig = Exclude<
  TableProps<EFOTerm>['pagination'],
  boolean
>;

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Record<string, string | boolean>;
  search?: string;
}
