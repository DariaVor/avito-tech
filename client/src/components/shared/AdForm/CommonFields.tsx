import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { AdvertisementFormData } from '.';
import { ItemType } from '../../../types';

interface CommonFieldsProps {
  form: UseFormReturn<AdvertisementFormData>;
}

export const CommonFields: React.FC<CommonFieldsProps> = ({
  form: {
    control,
    formState: { errors },
  },
}) => {
  const advertisementTypes = [
    { value: ItemType.REAL_ESTATE, label: 'Недвижимость' },
    { value: ItemType.AUTO, label: 'Авто' },
    { value: ItemType.SERVICES, label: 'Услуги' },
  ];

  return (
    <>
      <Grid item xs={12}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Название'
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message as string}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Описание'
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message as string}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name='location'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Локация'
              fullWidth
              error={!!errors.location}
              helperText={errors.location?.message as string}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name='image'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Фото URL'
              fullWidth
              error={!!errors.image}
              helperText={errors.image?.message as string}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name='type'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='Категория объявления'
              fullWidth
              error={!!errors.type}
              helperText={errors.type?.message as string}
            >
              {advertisementTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
    </>
  );
};
