import { FacebookPageService } from '../../domain/FacebookPageService';
import { Page } from '../../domain/Page';
import { PageRepository } from '../../domain/PageRepository';

type Dependencies = {
  pageRepository: PageRepository;
  facebookPageService: FacebookPageService;
};

type ConnectPageDTO = {
  token: string;
  fbPageId: string;
};

const makeConnectPage =
  ({ pageRepository, facebookPageService }: Dependencies) =>
  async (payload: ConnectPageDTO): Promise<string> => {
    const id = await pageRepository.getNextId();

    const fbInfo = await facebookPageService.getPageInfo({
      pageId: payload.fbPageId,
      token: payload.token,
    });

    const page = Page.create({
      id,
      name: fbInfo.name,
      profilePhoto: fbInfo.profilePhoto,
      address: fbInfo.address,
      description: fbInfo.description,
      hours: fbInfo.hours,
      phone: fbInfo.phone,
      photos: fbInfo.photos,
      temporarilyClosed: fbInfo.temporarilyClosed,
      website: fbInfo.website,
    });

    await pageRepository.store(page);

    return id.value;
  };

export { makeConnectPage };
