import { Repository } from '@/_lib/DDD';

import { Page } from './Page';

type PageRepository = Repository<Page.Type> & {
  findById(id: string): Promise<Page.Type | undefined>;
};
