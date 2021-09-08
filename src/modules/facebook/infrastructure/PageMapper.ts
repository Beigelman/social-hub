import { from } from 'uuid-mongodb';

import { DataMapper } from '@/_lib/DDD';
import { PageIdProvider } from '@/_sharedKernel/infrastructure/PageIdProvider';

import { Page } from '../domain/Page';
import { PageSchema } from './PageCollection';

const PageMapper: DataMapper<Page.Type, PageSchema> = {
  toData: (entity: Page.Type) => ({
    _id: from(entity.id.value),
    attributes: entity.attributes,
    temporarilyClosed: entity.temporarilyClosed,
    website: entity.website,
    name: entity.name,
    address: entity.address,
    description: entity.description,
    hours: entity.hours,
    phone: entity.phone,
    photos: entity.photos,
    profilePhoto: entity.profilePhoto,
    status: entity.status,
    createdAt: entity.createdAt,
    deleted: entity.status === 'DELETED',
    updatedAt: entity.createdAt,
    version: entity.version,
  }),
  toEntity: (data: PageSchema) => ({
    id: PageIdProvider.create(from(data._id).toString()),
    attributes: data.attributes,
    temporarilyClosed: data.temporarilyClosed,
    website: data.website,
    name: data.name,
    address: data.address,
    description: data.description,
    hours: data.hours,
    phone: data.phone,
    photos: data.photos,
    profilePhoto: data.profilePhoto,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.createdAt,
    version: data.version,
  }),
};

export { PageMapper };
