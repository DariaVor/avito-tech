import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { AdvertisementFormData } from '.';

interface AutoFieldsProps {
  form: UseFormReturn<AdvertisementFormData>;
}

export const AutoFields: React.FC<AutoFieldsProps> = ({
  form: {
    control,
    formState: { errors },
  },
}) => {
  const autoBrands = [
    { value: 'Toyota', label: 'Toyota' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Mercedes', label: 'Mercedes' },
  ];

  return (
    <>
      <Grid item xs={6}>
        <Controller
          name='brand'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='Марка'
              fullWidth
              error={!!(errors as any).brand}
              helperText={(errors as any).brand?.message as string}
            >
              {autoBrands.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name='model'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Модель'
              fullWidth
              error={!!(errors as any).model}
              helperText={(errors as any).model?.message as string}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name='year'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='number'
              slotProps={{ htmlInput: { min: 1886 } }}
              label='Год выпуска'
              fullWidth
              error={!!(errors as any).year}
              helperText={(errors as any).year?.message as string}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name='mileage'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='number'
              slotProps={{ htmlInput: { min: 1 } }}
              label='Пробег (км)'
              fullWidth
              error={!!(errors as any).mileage}
              helperText={(errors as any).mileage?.message as string}
            />
          )}
        />
      </Grid>
    </>
  );
};
