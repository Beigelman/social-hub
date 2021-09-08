import { Page } from './Page';

type GetPageDTO = Readonly<{
  token: string;
  pageId: string;
}>;

type FBPageInfo = Omit<Page.PageProps, 'id'>;

type FacebookPageService = {
  getPageInfo(payload: GetPageDTO): Promise<FBPageInfo>;
};

export { FacebookPageService, FBPageInfo, GetPageDTO };
