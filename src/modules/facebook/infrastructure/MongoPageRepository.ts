import { from, v4 as uuid } from 'uuid-mongodb';

import { PageId } from '@/_sharedKernel/domain/PageId';
import { PageIdProvider } from '@/_sharedKernel/infrastructure/PageIdProvider';

import { Page } from '../domain/Page';
import { PageRepository } from '../domain/PageRepository';
import { PageCollection } from './PageCollection';
import { PageMapper } from './PageMapper';

type Dependencies = {
  pageCollection: PageCollection;
};

const makeMongoPageRepository = ({ pageCollection }: Dependencies): PageRepository => ({
  async getNextId(): Promise<PageId> {
    return Promise.resolve(PageIdProvider.create(uuid().toString()));
  },

  async findById(id: string): Promise<Page.Type> {
    const article = await pageCollection.findOne({ _id: from(id), deleted: false });

    if (!article) {
      throw new Error('Article not found');
    }

    return PageMapper.toEntity(article);
  },

  async store(entity: Page.Type): Promise<void> {
    const { _id, version, ...data } = PageMapper.toData(entity);

    const count = await pageCollection.countDocuments({ _id });

    if (count) {
      await pageCollection.updateOne(
        { _id, version, deleted: false },
        {
          $set: {
            ...data,
            updatedAt: new Date(),
            version: version + 1,
          },
        }
      );

      return;
    }

    await pageCollection.insertOne({
      _id,
      ...data,
      version,
    });
  },
});

export { makeMongoPageRepository };
