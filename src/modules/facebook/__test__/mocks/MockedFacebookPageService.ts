import { FacebookPageService, FBPageInfo } from '../../domain/FacebookPageService';

const mockedFBPageInfo: FBPageInfo = {
  address: {
    city: 'Menlo Park',
    country: 'United States',
    latitude: 37.4822702,
    longitude: -122.1504749,
    state: 'CA',
    street: '1601 Willow Rd',
    zip: '94025',
  },
  attributes: {
    hasDelivery: false,
    hasInStorePickup: true,
    hasOnlineOfferings: false,
  },
  description: 'This is a mocked page infomation',
  hours: [
    {
      byAppointmentOnly: false,
      closeTime: '17:00',
      closed: true,
      day: 'SUNDAY',
      dayOfWeek: 'SUNDAY',
      openTime: '09:00',
    },
    {
      byAppointmentOnly: false,
      closeTime: '23:00',
      closed: false,
      day: 'MONDAY',
      dayOfWeek: 'MONDAY',
      openTime: '09:00',
    },
    {
      byAppointmentOnly: false,
      closeTime: '19:00',
      closed: false,
      day: 'TUESDAY',
      dayOfWeek: 'TUESDAY',
      openTime: '09:00',
    },
    {
      byAppointmentOnly: false,
      closeTime: '17:00',
      closed: false,
      day: 'WEDNESDAY',
      dayOfWeek: 'WEDNESDAY',
      openTime: '09:00',
    },
    {
      byAppointmentOnly: false,
      closeTime: '17:00',
      closed: false,
      day: 'THURSDAY',
      dayOfWeek: 'THURSDAY',
      openTime: '09:00',
    },
    {
      byAppointmentOnly: false,
      closeTime: '17:00',
      closed: false,
      day: 'FRIDAY',
      dayOfWeek: 'FRIDAY',
      openTime: '09:00',
    },
    {
      byAppointmentOnly: false,
      closeTime: '19:15',
      closed: false,
      day: 'SATURDAY',
      dayOfWeek: 'SATURDAY',
      openTime: '09:00',
    },
  ],
  name: 'Mocked FB Page Id',
  phone: '16982734818',
  profilePhoto: 'profile picture',
  photos: ['photo1', 'photo2'],
  temporarilyClosed: false,
  website: 'www.mywebsite.com',
};
const makeMockedFacebookPageService = (): FacebookPageService => ({
  async getPageInfo() {
    return mockedFBPageInfo;
  },
});

export { makeMockedFacebookPageService, mockedFBPageInfo };
