import axios from 'axios';
import AxiosAdapter from 'axios-mock-adapter';
import { randomBytes } from 'crypto';

import { makeTestControls, TestControls } from '@/__tests__/TestControls';

import { mockedFBPageInfo } from '../mocks/MockedFacebookPageService';

describe('Page Controller', () => {
  let controls: TestControls;
  const mockedAxios = new AxiosAdapter(axios);

  beforeAll(async () => {
    controls = await makeTestControls();
  });

  beforeEach(async () => {
    const { clearDatabase } = controls;

    await clearDatabase();
  });

  afterAll(async () => {
    const { cleanUp } = controls;

    await cleanUp();
  });

  describe('POST fb/connect', () => {
    it('connects an existing facebook page', () => {
      const {
        request,
        registry: { pageRepository },
      } = controls;

      const fbPageId = randomBytes(20).toString('hex');
      const token = randomBytes(20).toString('utf8');

      mockedAxios.onGet(`https://graph.facebook.com/v11.0/${fbPageId}`).reply(200, mockedFBPageInfo);

      request()
        .post('fb/connect')
        .send({
          fbPageId,
          token,
        })
        .expect(async res => {
          expect(res.status).toBe(201);
          expect(res.body).toHaveProperty('id');

          const page = await pageRepository.findById(res.body.id);

          expect(page).toEqual(
            expect.objectContaining({
              name: mockedFBPageInfo.name,
              description: mockedFBPageInfo.description,
            })
          );
        });
    });
  });
});
