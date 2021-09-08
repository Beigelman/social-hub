import { Filter } from 'mongodb';
import MUUID from 'uuid-mongodb';

import { NotFoundError } from '@/_lib/errors/NotFoundError';

import { PageCollection, PageSchema } from '../../infrastructure/PageCollection';
import { FindPages } from '../FindPage';

type Dependencies = Readonly<{
  pageCollection: PageCollection;
}>;

const makeMongoFindPage =
  ({ pageCollection }: Dependencies): FindPages =>
  async ({ id }) => {
    const match: Filter<PageSchema> = {
      _id: MUUID.from(id),
      status: 'PUBLISHED',
      deleted: false,
    };

    const page = await pageCollection.aggregate([{ $match: match }]).toArray<PageSchema>();

    if (!page.length) {
      throw NotFoundError.create('Page not found');
    }

    return {
      id: MUUID.from(page[0]._id).toString(),
      attributes: page[0].attributes,
      name: page[0].name,
      address: page[0].address,
      status: page[0].status,
      hours: page[0].hours,
      description: page[0].description,
      phone: page[0].phone,
      photos: page[0].photos,
      profilePhoto: page[0].profilePhoto,
      temporarilyClosed: page[0].temporarilyClosed,
      website: page[0].website,
    };
  };

export { makeMongoFindPage };
