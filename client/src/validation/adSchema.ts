import { z } from 'zod';
import { ItemType } from '../types';
import { capitalize } from '../utils/format';

const baseSchema = z.object({
  name: z
    .string()
    .min(3, 'Название должно содержать минимум 3 символа')
    .max(50, 'Название не должно превышать 50 символов')
    .transform((s) => capitalize(s.trim())),
  description: z
    .string()
    .min(3, 'Описание должно содержать минимум 3 символа')
    .max(500, 'Описание не должно превышать 500 символов')
    .transform((s) => s.trim()),
  location: z
    .string()
    .min(3, 'Локация должна содержать минимум 3 символа')
    .max(50, 'Локация не должна превышать 50 символов')
    .transform((s) => capitalize(s.trim())),
  image: z.string().optional(),
});

const realEstateSchema = baseSchema.extend({
  type: z.literal(ItemType.REAL_ESTATE),
  propertyType: z
    .string()
    .min(1, 'Тип недвижимости обязателен')
    .max(50, 'Тип недвижимости не должен превышать 50 символов')
    .transform((s) => capitalize(s.trim())),
  area: z.preprocess(
    (a) => (typeof a === 'string' && a.trim() !== '' ? Number(a) : a),
    z
      .number({ invalid_type_error: 'Площадь должна быть числом' })
      .min(1, 'Площадь не может быть меньше 1')
      .max(100000, 'Площадь не должна превышать 100000 квадратных метров'),
  ),
  rooms: z.preprocess(
    (a) => (typeof a === 'string' && a.trim() !== '' ? Number(a) : a),
    z
      .number({ invalid_type_error: 'Количество комнат должно быть числом' })
      .min(1, 'Количество комнат не может быть меньше 1')
      .max(100, 'Количество комнат не должно превышать 100'),
  ),
  price: z.preprocess(
    (a) => (typeof a === 'string' && a.trim() !== '' ? Number(a) : a),
    z
      .number({ invalid_type_error: 'Цена должна быть числом' })
      .min(0, 'Цена не может быть отрицательной')
      .max(1000000000, 'Цена не должна превышать 1000000000 рублей'),
  ),
});

const autoSchema = baseSchema.extend({
  type: z.literal(ItemType.AUTO),
  brand: z
    .string()
    .min(1, 'Марка обязательна')
    .max(50, 'Марка не должна превышать 50 символов')
    .transform((s) => capitalize(s.trim())),
  model: z
    .string()
    .min(1, 'Модель обязательна')
    .max(50, 'Модель не должна превышать 50 символов')
    .transform((s) => s.trim()),
  year: z.preprocess(
    (a) => (typeof a === 'string' && a.trim() !== '' ? Number(a) : a),
    z
      .number({ invalid_type_error: 'Год выпуска должен быть числом' })
      .min(1886, 'Год выпуска не может быть меньше 1886')
      .max(2025, 'Год выпуска не должен превышать 2025'),
  ),
  mileage: z
    .preprocess(
      (a) => (typeof a === 'string' && a.trim() !== '' ? Number(a) : a),
      z
        .number({ invalid_type_error: 'Пробег должен быть числом' })
        .min(0, 'Пробег не может быть отрицательным')
        .max(1000000, 'Пробег не должен превышать 1000000 километров'),
    )
    .optional(),
});

const servicesSchema = baseSchema.extend({
  type: z.literal(ItemType.SERVICES),
  serviceType: z
    .string()
    .min(1, 'Тип услуги обязателен')
    .max(50, 'Тип услуги не должен превышать 50 символов')
    .transform((s) => capitalize(s.trim())),
  experience: z.preprocess(
    (a) => (typeof a === 'string' && a.trim() !== '' ? Number(a) : a),
    z
      .number({ invalid_type_error: 'Опыт работы должен быть числом' })
      .min(0, 'Опыт работы не может быть отрицательным')
      .max(100, 'Опыт работы не должен превышать 100 лет'),
  ),
  cost: z.preprocess(
    (a) => (typeof a === 'string' && a.trim() !== '' ? Number(a) : a),
    z
      .number({ invalid_type_error: 'Стоимость должна быть числом' })
      .min(0, 'Стоимость не может быть отрицательной')
      .max(1000000, 'Стоимость не должна превышать 1000000 рублей'),
  ),
  workSchedule: z
    .string()
    .optional()
    .transform((s) => s?.trim()),
});

export const advertisementSchema = z.discriminatedUnion('type', [
  realEstateSchema,
  autoSchema,
  servicesSchema,
]);
