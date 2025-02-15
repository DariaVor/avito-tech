import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { advertisementSchema } from '../../../validation/adSchema';
import { Grid } from '@mui/material';
import { z } from 'zod';
import { ItemType } from '../../../store/types';
import { BackButton, EditButton } from '../../ui';
import { CommonFields } from './CommonFields';
import { RealEstateFields } from './RealEstateFields';
import { AutoFields } from './AutoFields';
import { ServiceFields } from './ServiceFields';

export type AdvertisementFormData = z.infer<typeof advertisementSchema>;

interface AdvertisementFormProps {
  initialData?: AdvertisementFormData;
  onSubmit: (data: AdvertisementFormData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

export const AdvertisementForm: React.FC<AdvertisementFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const formMethods: UseFormReturn<AdvertisementFormData> = useForm<AdvertisementFormData>({
    resolver: zodResolver(advertisementSchema),
    defaultValues:
      initialData ||
      ({
        name: '',
        description: '',
        location: '',
        image: '',
        type: ItemType.REAL_ESTATE,
        propertyType: '',
        area: 0,
        rooms: 0,
        price: 0,
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        mileage: 0,
        serviceType: '',
        experience: 0,
        cost: 0,
        workSchedule: '',
      } as any),
  });

  const { handleSubmit, watch } = formMethods;
  const selectedType = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <CommonFields form={formMethods} />

        {selectedType === ItemType.REAL_ESTATE && <RealEstateFields form={formMethods} />}
        {selectedType === ItemType.AUTO && <AutoFields form={formMethods} />}
        {selectedType === ItemType.SERVICES && <ServiceFields form={formMethods} />}

        <Grid item xs={12} container spacing={2} justifyContent='flex-end'>
          <Grid item>
            <BackButton onClick={onCancel}>Отмена</BackButton>
          </Grid>
          <Grid item>
            <EditButton type='submit'>{isEditing ? 'Сохранить' : 'Создать'}</EditButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
