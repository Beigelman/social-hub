import { asFunction } from 'awilix';

import { withMongoProvider } from '@/_lib/MongoProvider';
import { toContainerValues } from '@/_lib/wrappers/toContainerFunctions';
import { makeModule } from '@/context';
import { ConnectPage, makeConnectPage } from '@/modules/facebook/application/ConnectPage';
import { PageRepository } from '@/modules/facebook/domain/PageRepository';
import { makeMongoPageRepository } from '@/modules/facebook/infrastructure/MongoPageRepository';
import { initPageCollection, PageCollection } from '@/modules/facebook/infrastructure/PageCollection';
import { makePageController } from '@/modules/facebook/interface/http/pageController';

const pageModule = makeModule('article', async ({ container: { register, build } }) => {
  const collections = await build(
    withMongoProvider({
      pageCollection: initPageCollection,
    })
  );

  register({
    ...toContainerValues(collections),
    pageRepository: asFunction(makeMongoPageRepository),
    connectPage: asFunction(makeConnectPage),
  });

  build(makePageController);
});

type PageRegistry = {
  pageCollection: PageCollection;
  pageRepository: PageRepository;
  connectPage: ConnectPage;
};

export { pageModule };
export type { PageRegistry };
