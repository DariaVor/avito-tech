import React, { useState, useEffect, useMemo } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useGetItemsQuery } from '../store/api/itemApi';
import { DetailsButton } from '../components/ui';
import { Item } from '../types';
import useDebounce from '../hooks/useDebounce';
import {
  CategoryFilter,
  ErrorMessage,
  ItemCard,
  Loader,
  PaginationControls,
  SearchBar,
} from '../components/shared';

const List: React.FC = () => {
  const { data: items, isLoading, error } = useGetItemsQuery();

  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce(searchText, 500);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const filteredItems = useMemo(() => {
    if (!items) return [];
    let filtered = items;

    if (debouncedSearchText.trim().length >= 3) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearchText.trim().toLowerCase()),
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) => selectedCategories.includes(item.type));
    }

    return filtered;
  }, [items, debouncedSearchText, selectedCategories]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchText, selectedCategories]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <Container sx={{ mt: 4, alignItems: 'center' }}>
      <Typography variant='h4' gutterBottom>
        Список объявлений
      </Typography>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        onClear={handleClearSearch}
      />

      <CategoryFilter
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />

      <DetailsButton to='/form' sx={{ mb: 4 }}>
        Разместить объявление
      </DetailsButton>

      {isLoading && <Loader />}
      {error && <ErrorMessage message='Произошла ошибка при загрузке данных' />}

      <Grid container spacing={4}>
        {paginatedItems.map((item: Item) => (
          <Grid item xs={12} key={item.id}>
            <ItemCard item={item} />
          </Grid>
        ))}
      </Grid>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onNext={() => setCurrentPage((prev) => prev + 1)}
        onPrevious={() => setCurrentPage((prev) => prev - 1)}
      />
    </Container>
  );
};

export default List;
