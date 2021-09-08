import { Page } from '../domain/Page';

type PageDTO = Readonly<{
  id: string;
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
}>;

type PageFilter = {
  id: string;
};

type QueryHandler<F, D> = (payload: F) => Promise<D>;

type FindPages = QueryHandler<PageFilter, PageDTO>;

export { FindPages };
