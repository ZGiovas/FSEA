import React, { useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

interface SearchFieldProps {
  onSearch: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 500),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Input
      placeholder="Search EFO Terms..."
      value={searchValue}
      onChange={handleSearchChange}
      style={{ width: 300, marginBottom: 16 }}
      allowClear
    />
  );
};

export default SearchField;
