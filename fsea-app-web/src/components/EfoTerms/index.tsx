import type { TableProps } from 'antd';
import { Flex, Table, message } from 'antd';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import {
  EFOTerm,
  PaginatedEFOTermsResponse,
  TableParams,
} from '../../types/efo-terms';
import SearchField from './SearchField';
import useEfoColumns from './hooks/useEfoColumns';
import { transformAntDFiltersToAPI } from './utils';

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

  const columns = useEfoColumns();

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
