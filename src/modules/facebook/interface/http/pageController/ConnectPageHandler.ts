import { Request, Response } from 'express';
import Joi from 'types-joi';

import { handler } from '@/_lib/http/handler';
import { HttpStatus } from '@/_lib/http/HttpStatus';
import { makeValidator } from '@/_lib/http/validation/Validator';
import { ConnectPage } from '@/modules/facebook/application/ConnectPage';

type Dependencies = {
  connectPage: ConnectPage;
};

const { getBody } = makeValidator({
  body: Joi.object({
    fbPageId: Joi.string().required(),
    token: Joi.string().required(),
  }).required(),
});

const connectPageHandler = handler(({ connectPage }: Dependencies) => async (req: Request, res: Response) => {
  const { fbPageId, token } = getBody(req);

  const pageId = await connectPage({ fbPageId, token });

  res.status(HttpStatus.CREATED).json({ id: pageId });
});

export { connectPageHandler };
