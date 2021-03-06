import { asValue } from 'awilix';
import { Logger } from 'pino';

import { appModules } from '@/_boot/appModules';
import { database } from '@/_boot/database';
import { pubSub } from '@/_boot/pubSub';
import { repl } from '@/_boot/repl';
import { server } from '@/_boot/server';
import { swagger } from '@/_boot/swagger';
import { Configuration } from '@/config';
import { withContext } from '@/context';
import { MessageBundle } from '@/messages';
import { graphql } from '@/_boot/graphql';

const main = withContext(async ({ app, container, config, bootstrap, logger, messageBundle }) => {
  container.register({
    app: asValue(app),
    messageBundle: asValue(messageBundle),
    logger: asValue(logger),
    startedAt: asValue(new Date()),
    config: asValue(config),
  });

  await bootstrap(database, server, graphql, swagger, pubSub, repl, ...appModules);
});

type MainRegistry = {
  app: any;
  messageBundle: MessageBundle;
  startedAt: Date;
  logger: Logger;
  config: Configuration;
};

export { main };
export type { MainRegistry };
