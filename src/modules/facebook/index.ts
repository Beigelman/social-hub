import { asFunction } from 'awilix';

import { withMongoProvider } from '@/_lib/MongoProvider';
import { toContainerValues } from '@/_lib/wrappers/toContainerFunctions';
import { makeModule } from '@/context';
import { ConnectPage, makeConnectPage } from '@/modules/facebook/application/ConnectPage';
import { PageRepository } from '@/modules/facebook/domain/PageRepository';
import { makeMongoPageRepository } from '@/modules/facebook/infrastructure/MongoPageRepository';
import { initPageCollection, PageCollection } from '@/modules/facebook/infrastructure/PageCollection';
import { makePageController } from '@/modules/facebook/interface/http/pageController';

import { FacebookPageService } from './domain/FacebookPageService';
import { makeHttpFacebookPageService } from './infrastructure/HttpFacebookPageService';
import { FacebookGQLQueries, makeFacebookGQLQueries } from './interface/graphql';
import { FindPages } from './query/FindPage';
import { makeMongoFindPage } from './query/impl/MongoFindPage';
import { withModuleRegister } from '@/_lib/graphql/resolver';

const facebookModule = makeModule('facebook', async ({ container: { register, build } }) => {
  const collections = await build(
    withMongoProvider({
      pageCollection: initPageCollection,
    })
  );

  register({
    ...toContainerValues(collections),
    facebookGQLQueries: asFunction(makeFacebookGQLQueries),
    facebookPageService: asFunction(makeHttpFacebookPageService),
    pageRepository: asFunction(makeMongoPageRepository),
    findPage: asFunction(makeMongoFindPage),
    connectPage: asFunction(makeConnectPage),
  });

  build(
    withModuleRegister({
      queries: build(makeFacebookGQLQueries),
      mutations: {},
    })
  );

  build(makePageController);
});

type FacebookRegistry = {
  facebookGQLQueries: FacebookGQLQueries;
  facebookPageService: FacebookPageService;
  pageCollection: PageCollection;
  pageRepository: PageRepository;
  connectPage: ConnectPage;
  findPage: FindPages;
};

export { facebookModule };
export type { FacebookRegistry };
