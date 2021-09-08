import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLObjectTypeConfig,
  GraphQLString,
} from 'graphql';

import { PageSchema } from '@/modules/facebook/infrastructure/PageCollection';

type ConfigType = GraphQLObjectTypeConfig<PageSchema, any>;

const AddressType = new GraphQLObjectType({
  name: 'Address',
  description: 'The facebook page address',
  fields: () => ({
    city: {
      type: GraphQLString,
      resolve: address => address.city,
    },
    country: {
      type: GraphQLString,
      resolve: address => address.country,
    },
    latitude: {
      type: GraphQLString,
      resolve: address => address.latitude,
    },
    longitude: {
      type: GraphQLString,
      resolve: address => address.longitude,
    },
    state: {
      type: GraphQLString,
      resolve: address => address.state,
    },
    street: {
      type: GraphQLString,
      resolve: address => address.street,
    },
    zip: {
      type: GraphQLString,
      resolve: address => address.zip,
    },
  }),
});

const AttributesType = new GraphQLObjectType({
  name: 'Attributes',
  description: 'Delivery options the business have',
  fields: () => ({
    hasDelivery: {
      type: GraphQLBoolean,
      resolve: attr => attr.hasDelivery,
    },
    hasInStorePickup: {
      type: GraphQLBoolean,
      resolve: attr => attr.hasInStorePickup,
    },
    hasOnlineOfferings: {
      type: GraphQLBoolean,
      resolve: attr => attr.hasOnlineOfferings,
    },
  }),
});

const DayOfWeek = new GraphQLEnumType({
  name: 'DayOfWeek',
  values: {
    SUNDAY: { value: 'SUNDAY' },
    MONDAY: { value: 'MONDAY' },
    TUESDAY: { value: 'TUESDAY' },
    WEDNESDAY: { value: 'WEDNESDAY' },
    THURSDAY: { value: 'THURSDAY' },
    FRIDAY: { value: 'FRIDAY' },
    SATURDAY: { value: 'SATURDAY' },
  },
});

const HourType = new GraphQLObjectType({
  name: 'Hours',
  fields: () => ({
    day: {
      type: GraphQLString,
      resolve: hour => hour.day,
    },
    dayOfWeek: {
      type: DayOfWeek,
      resolve: hour => hour.dayOfWeek,
    },
    openTime: {
      type: GraphQLString,
      resolve: hour => hour.openTime,
    },
    closeTime: {
      type: GraphQLString,
      resolve: hour => hour.closeTime,
    },
    byAppointmentOnly: {
      type: GraphQLBoolean,
      resolve: hour => hour.byAppointmentOnly,
    },
    closed: {
      type: GraphQLBoolean,
      resolve: hour => hour.closed,
    },
  }),
});

const StatusType = new GraphQLEnumType({
  name: 'Status',
  values: {
    PUBLISHED: { value: 'PUBLISHED' },
    NEEDS_UPGRADE: { value: 'NEEDS_UPGRADE' },
    DELETED: { value: 'DELETED' },
  },
});

const PageTypeConfig: ConfigType = {
  name: 'Page',
  description: 'Facebook page',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The page Id',
      resolve: page => page._id,
    },
    address: {
      type: AddressType,
      description: 'The business address',
      resolve: page => page.address,
    },
    attributes: {
      type: AttributesType,
      description: 'The business attributes',
      resolve: page => page.attributes,
    },
    description: {
      type: GraphQLString,
      description: 'The page description',
      resolve: page => page.description,
    },
    hours: {
      type: GraphQLList(HourType),
      description: 'The business working hours',
      resolve: page => page.hours,
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The page name',
      resolve: page => page.name,
    },
    photos: {
      type: GraphQLList(GraphQLString),
      description: "The page's photos",
      resolve: page => page.photos,
    },
    phone: {
      type: GraphQLString,
      description: "The page's phone",
      resolve: page => page.phone,
    },
    profilePhoto: {
      type: GraphQLString,
      description: "The page's profile photo",
      resolve: page => page.profilePhoto,
    },
    status: {
      type: StatusType,
      description: 'The page current status',
      resolve: page => page.status,
    },
    temporarilyClosed: {
      type: GraphQLBoolean,
      description: 'The page temporarily closed status',
      resolve: page => page.temporarilyClosed,
    },
    website: {
      type: GraphQLString,
      description: 'The page description',
      resolve: page => page.website,
    },
  }),
};

const PageType = new GraphQLObjectType(PageTypeConfig);

export { PageType };
