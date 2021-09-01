import { Page } from './Page';

type GetPageDTO = Readonly<{
  token: string;
  pageId: string;
}>;

type FBPageInfo = Omit<Page.Type, 'id'>;

type FacebookPageService = {
  getPageInfo(payload: GetPageDTO): Promise<FBPageInfo>;
};
