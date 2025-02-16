import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { AdvertisementFormData } from '.';

interface ServiceFieldsProps {
  form: UseFormReturn<AdvertisementFormData>;
}

export const ServiceFields: React.FC<ServiceFieldsProps> = ({
  form: {
    control,
    formState: { errors },
  },
}) => {
  const serviceTypes = [
    { value: 'Ремонт', label: 'Ремонт' },
    { value: 'Уборка', label: 'Уборка' },
    { value: 'Доставка', label: 'Доставка' },
  ];

  return (
    <>
      <Grid item xs={6}>
        <Controller
          name='serviceType'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label='Тип услуги'
              fullWidth
              error={!!(errors as any).serviceType}
              helperText={(errors as any).serviceType?.message as string}
            >
              {serviceTypes.map((option) => (
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
          name='experience'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='number'
              slotProps={{ htmlInput: { min: 0.5, max: 100, step: 0.5 } }}
              label='Опыт работы (лет)'
              fullWidth
              error={!!(errors as any).experience}
              helperText={(errors as any).experience?.message as string}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name='cost'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type='number'
              slotProps={{ htmlInput: { min: 1 } }}
              label='Стоимость'
              fullWidth
              error={!!(errors as any).cost}
              helperText={(errors as any).cost?.message as string}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name='workSchedule'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='График работы'
              fullWidth
              error={!!(errors as any).workSchedule}
              helperText={(errors as any).workSchedule?.message as string}
            />
          )}
        />
      </Grid>
    </>
  );
};
