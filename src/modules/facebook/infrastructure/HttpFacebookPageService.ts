import axios from 'axios';
import { Logger } from 'pino';

import { getErrorDetails } from '@/_lib/errors/Utils';
import { ExternalProviderError } from '@/_sharedKernel/domain/error/ExternalProviderError';

import { FacebookPageService, FBPageInfo } from '../domain/FacebookPageService';
import { Page } from '../domain/Page';
import { buildHours } from '../utils/buildHoursForFacebookPage';

const FB_OFFERINGS_TO_ATTRIBUTES = {
  delivery: 'hasDelivery',
  pickup: 'hasInStorePickup',
  online_services: 'hasOnlineOfferings',
};

const getAttributes = (offeringsData): Page.Attributes => {
  if (!offeringsData) return {};

  return offeringsData.reduce((mappedAttributes, offering) => {
    const { key, value } = offering;
    const mappedAttribute = FB_OFFERINGS_TO_ATTRIBUTES[key];
    if (mappedAttribute) {
      // eslint-disable-next-line no-param-reassign
      mappedAttributes[mappedAttribute] = value;
    }
    return mappedAttributes;
  }, {});
};

const getPhotos = photosData => photosData.map(photo => photo.source) || [];

type Dependencies = {
  logger: Logger;
};
const makeHttpFacebookPageService = ({ logger }: Dependencies): FacebookPageService => {
  const client = axios.create({
    baseURL: 'https://graph.facebook.com/v11.0/',
  });

  return {
    async getPageInfo({ pageId, token }) {
      const fields = [
        'about',
        'category',
        'category_list',
        'description',
        'differently_open_offerings',
        'hours',
        'location',
        'name',
        'phone',
        'photos{source}',
        'picture',
        'temporary_status',
        'website',
      ];

      let pageInfoData: any;

      try {
        const { data } = await client.get(pageId, {
          params: {
            access_token: token,
            fields: fields.join(','),
          },
        });

        pageInfoData = data;
      } catch (err: any) {
        const providerError = getErrorDetails(err);
        logger.error(providerError);

        throw ExternalProviderError.create({
          message: `Failed to query basic page info for ${pageId}`,
          providerError,
        });
      }

      const pageInfo: FBPageInfo = {
        address: pageInfoData.location,
        attributes: getAttributes(pageInfoData.differently_open_offerings),
        description: pageInfoData.description,
        hours: buildHours(pageInfoData.hours),
        name: pageInfoData.name,
        phone: pageInfoData.phone,
        profilePhoto: pageInfoData.picture?.data?.url,
        photos: getPhotos(pageInfoData.photos?.data),
        temporarilyClosed: pageInfoData.temporary_status === 'temporarily_closed',
        website: pageInfoData.website,
      };

      return pageInfo;
    },
  };
};

export { makeHttpFacebookPageService };
