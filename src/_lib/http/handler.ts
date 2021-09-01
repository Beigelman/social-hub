import { asFunction } from 'awilix';
import { RequestHandler } from 'express';

import { AsyncHandler, runAsync } from '@/_lib/http/runAsync';

type ControllerHandler = (dependencies: any) => AsyncHandler;

const handler = (handlerProps: ControllerHandler): RequestHandler => {
  const resolver = asFunction(handlerProps);

  return (req, res, next) => {
    if (!('container' in req)) {
      throw new Error("Can't find the request container! Have you registered the `requestContainer` middleware?");
    }

    const injectedHandler = req.container.build(resolver);

    return runAsync(injectedHandler)(req, res, next);
  };
};

export { handler };
