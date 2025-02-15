import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { AdvertisementFormData } from '.';

interface RealEstateFieldsProps {
  form: UseFormReturn<AdvertisementFormData>;
}

export const RealEstateFields: React.FC<RealEstateFieldsProps> = ({
  form: {
    control,
    formState: { errors },
  },
}) => {
  const realEstateTypes = [
    { value: 'Квартира', label: 'Квартира' },
    { value: 'Дом', label: 'Дом' },
    { value: 'Коттедж', label: 'Коттедж' },
    { value: 'Дача', label: 'Дача' },
  ];

  return (
    <>
      <Grid item xs={12}>
        <Controller
          name='propertyType'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='Тип недвижимости'
              fullWidth
              error={!!(errors as any).propertyType}
              helperText={(errors as any).propertyType?.message as string}
            >
              {realEstateTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name='area'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='number'
              slotProps={{ htmlInput: { min: 1 } }}
              label='Площадь (кв. м)'
              fullWidth
              error={!!(errors as any).area}
              helperText={(errors as any).area?.message as string}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name='rooms'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='number'
              slotProps={{ htmlInput: { min: 1 } }}
              label='Количество комнат'
              fullWidth
              error={!!(errors as any).rooms}
              helperText={(errors as any).rooms?.message as string}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name='price'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='number'
              slotProps={{ htmlInput: { min: 0 } }}
              label='Цена'
              fullWidth
              error={!!(errors as any).price}
              helperText={(errors as any).price?.message as string}
            />
          )}
        />
      </Grid>
    </>
  );
};
