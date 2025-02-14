export enum ItemType {
  REAL_ESTATE = 'Недвижимость',
  AUTO = 'Авто',
  SERVICES = 'Услуги',
}

export interface BaseItem {
  id: number;
  name: string;
  description: string;
  location: string;
  type: ItemType;
  image?: string;
}

export interface RealEstateItem extends BaseItem {
  type: ItemType.REAL_ESTATE;
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface AutoItem extends BaseItem {
  type: ItemType.AUTO;
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface ServiceItem extends BaseItem {
  type: ItemType.SERVICES;
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

export type Item = RealEstateItem | AutoItem | ServiceItem;

export type CreateItemRequest = Omit<Item, 'id'>;
