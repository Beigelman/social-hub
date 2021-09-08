import { makeConnectPage } from '../../application/ConnectPage';
import { makeMockedFacebookPageService } from '../mocks/MockedFacebookPageService';
import { makeMockedPageRepository } from '../mocks/MockedPageRepository';

const setUp = () => {
  const pageRepository = makeMockedPageRepository();
  const facebookPageService = makeMockedFacebookPageService();

  const connectPage = makeConnectPage({
    facebookPageService,
    pageRepository,
  });

  return {
    connectPage,
    pageRepository,
    facebookPageService,
  };
};

describe('ConnectPage', () => {
  const fakePageId = 'fake-page-id';
  const fakeToken = 'fake-token';
  describe('when successfully connecting', () => {
    it('returns the page id', async () => {
      const { connectPage } = setUp();

      const result = await connectPage({ fbPageId: fakePageId, token: fakeToken });

      expect(result).toBe('mockedId');
    });
  });
});
