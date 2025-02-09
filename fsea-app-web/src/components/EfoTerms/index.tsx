import type { TableProps } from 'antd';
import { Flex, Table, message } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import {
  EFOSynonym,
  EFOTerm,
  PaginatedEFOTermsResponse,
} from '../../types/efo-terms';
import { transformAntDFiltersToAPI } from './utils';
import SearchField from './SearchField';

type TablePaginationConfig = Exclude<
  TableProps<EFOTerm>['pagination'],
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Record<string, string | boolean>;
  search?: string;
}

const columns: TableProps<EFOTerm>['columns'] = [
  {
    title: 'Ontology ID',
    dataIndex: 'ontology_id',
    sorter: true,
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Label',
    dataIndex: 'label',
    sorter: true,
    width: 200,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: 300,
    render: (description: string) => description || 'N/A',
  },
  {
    title: 'OBO ID',
    dataIndex: 'obo_id',
    sorter: true,
    width: 150,
    render: (obo_id: string | null) => obo_id || 'N/A',
  },
  {
    title: 'IRI',
    dataIndex: 'iri',
    width: 250,
    render: (iri: string) => (
      <a href={iri} target="_blank" rel="noopener noreferrer">
        {iri}
      </a>
    ),
  },
  {
    title: 'Language',
    dataIndex: 'lang',
    width: 120,
  },
  {
    title: 'Is Obsolete',
    dataIndex: 'is_obsolete',
    width: 120,
    filters: [
      { text: 'Yes', value: true },
      { text: 'No', value: false },
    ],
    render: (is_obsolete: boolean) => (is_obsolete ? 'Yes' : 'No'),
  },
  {
    title: 'Has Children',
    dataIndex: 'has_children',
    width: 120,
    filters: [
      { text: 'Yes', value: true },
      { text: 'No', value: false },
    ],
    render: (has_children: boolean) => (has_children ? 'Yes' : 'No'),
  },
  {
    title: 'Is Root',
    dataIndex: 'is_root',
    width: 120,
    filters: [
      { text: 'Yes', value: true },
      { text: 'No', value: false },
    ],
    render: (is_root: boolean) => (is_root ? 'Yes' : 'No'),
  },
  {
    title: 'Synonyms',
    dataIndex: 'synonyms',
    width: 300,
    render: (synonyms: EFOSynonym[] | undefined) =>
      synonyms && synonyms.length > 0
        ? synonyms.map((s) => s.synonym).join(', ')
        : 'N/A',
  },
];

const getParams = (params: TableParams) => ({
  page: params.pagination?.current,
  page_size: params.pagination?.pageSize,
  ordering:
    params.sortOrder === 'descend' ? `-${params.sortField}` : params.sortField,
  search: params.search,
  ...params?.filters,
});

const EfoTerms: React.FC = () => {
  const [data, setData] = useState<EFOTerm[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    search: '',
    filters: {},
  });

  const fetchEfoTerms = () => {
    setLoading(true);
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}efo/terms/?${qs.stringify(
        getParams(tableParams),
      )}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((response: PaginatedEFOTermsResponse) => {
        setData(response.results);
        setLoading(false);
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: response.total_count,
          },
        }));
      })
      .catch((error) => {
        message.error(error.message || 'Error fetching data');
        setLoading(false);
      });
  };

  const handleTableChange: TableProps<EFOTerm>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    setTableParams({
      pagination,
      filters: transformAntDFiltersToAPI(filters),
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleSearch = (value: string) => {
    setTableParams((prev) => ({
      ...prev,
      search: value,
      pagination: { ...prev.pagination, current: 1 },
    }));
  };

  useEffect(fetchEfoTerms, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams.sortOrder,
    tableParams.sortField,
    tableParams.search,
    JSON.stringify(tableParams.filters),
  ]);

  return (
    <Flex vertical>
      <SearchField onSearch={handleSearch} />
      <Table<EFOTerm>
        columns={columns}
        rowKey={(record) => record.ontology_id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
      />
    </Flex>
  );
};

export default EfoTerms;
