import { asValue } from 'awilix';
import express, { Router, Application, json, urlencoded } from 'express';
// import { graphqlHTTP } from 'express-graphql';
// import { GraphQLSchema } from 'graphql';
import { createServer } from 'http';
import httpLogger from 'pino-http';

import { errorHandler } from '@/_lib/http/middlewares/errorHandler';
import { gracefulShutdown } from '@/_lib/http/middlewares/gracefulShutdown';
import { requestContainer } from '@/_lib/http/middlewares/requestContainer';
import { requestId } from '@/_lib/http/middlewares/requestId';
import { errorConverters } from '@/_sharedKernel/interface/http/ErrorConverters';
import { makeModule } from '@/context';

type ServerConfig = {
  http: {
    host: string;
    port: number;
  };
};

const server = makeModule(
  'server',
  async ({ app: { onBooted, onReady }, container, config: { cli, http, environment }, logger }) => {
    const { register } = container;
    const expressServer = express();

    const httpServer = createServer(expressServer);

    const { shutdownHook, shutdownHandler } = gracefulShutdown(httpServer);

    expressServer.use(shutdownHandler());
    expressServer.use(requestId());
    expressServer.use(requestContainer(container));
    expressServer.use(httpLogger());
    expressServer.use(json());
    expressServer.use(urlencoded({ extended: false }));

    const rootRouter = Router();
    const apiRouter = Router();

    rootRouter.use('/api', apiRouter);

    expressServer.use(rootRouter);

    onBooted(async () => {
      expressServer.use((req, res) => {
        res.sendStatus(404);
      });

      expressServer.use(errorHandler(errorConverters, { logger }));
    });

    if (!cli && environment !== 'test') {
      onReady(
        async () =>
          new Promise<void>(resolve => {
            httpServer.listen(http.port, http.host, () => {
              logger.info(`Webserver listening at: http://${http.host}:${http.port}`);
              resolve();
            });
          })
      );
    }

    register({
      server: asValue(expressServer),
      rootRouter: asValue(rootRouter),
      apiRouter: asValue(apiRouter),
    });

    return async () => {
      await shutdownHook();
    };
  }
);

type ServerRegistry = {
  requestId?: string;
  server: Application;
  rootRouter: Router;
  apiRouter: Router;
};

export { server };
export type { ServerRegistry, ServerConfig };
