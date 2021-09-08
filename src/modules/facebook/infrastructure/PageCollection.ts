import { Collection, Db } from 'mongodb';
import { MUUID } from 'uuid-mongodb';

import { Page } from '../domain/Page';

type PageSchema = {
  _id: MUUID;
  address?: Page.Address;
  attributes: Page.Attributes;
  description?: string;
  hours?: Page.Hour[];
  name: string;
  photos?: string[];
  phone?: string;
  profilePhoto?: string;
  status: 'PUBLISHED' | 'NEEDS_UPGRADE' | 'DELETED';
  temporarilyClosed?: boolean;
  website?: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

type PageCollection = Collection<PageSchema>;

const initPageCollection = async (db: Db): Promise<PageCollection> => {
  const collection: PageCollection = db.collection('page');
  await collection.createIndex({ _id: 1, version: 1 });
  await collection.createIndex({ _id: 1, deleted: 1 });

  return collection;
};

export { initPageCollection };
export type { PageSchema, PageCollection };
