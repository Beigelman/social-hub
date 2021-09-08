import { AggregateRoot } from '@/_lib/DDD';
import { makeWithInvariants } from '@/_lib/WithInvariants';
import { PageId } from '@/_sharedKernel/domain/PageId';

namespace Page {
  export type Hour = Readonly<{
    day: string;
    dayOfWeek: 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
    openTime: string;
    closeTime: string;
    byAppointmentOnly: boolean;
    closed: boolean;
  }>;

  export type Address = Readonly<{
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    state?: string;
    street?: string;
    zip?: string;
  }>;

  export type Attributes = {
    hasDelivery?: boolean;
    hasInStorePickup?: boolean;
    hasOnlineOfferings?: boolean;
  };

  type Page = AggregateRoot<PageId> &
    Readonly<{
      address?: Address;
      attributes: Attributes;
      description?: string;
      hours?: Hour[];
      name: string;
      photos?: string[];
      phone?: string;
      profilePhoto?: string;
      status: 'PUBLISHED' | 'NEEDS_UPGRADE' | 'DELETED';
      temporarilyClosed?: boolean;
      website?: string;
      createdAt: Date;
      updatedAt: Date;
      version: number;
    }>;

  export type PageProps = Readonly<{
    id: PageId;
    address?: Address;
    attributes: Attributes;
    description?: string;
    hours?: Hour[];
    name: string;
    phone?: string;
    profilePhoto?: string;
    photos?: string[];
    temporarilyClosed?: boolean;
    website?: string;
  }>;

  const withInvariants = makeWithInvariants<Page>((self, assert) => {
    assert(self.name?.length > 0, 'Your Page must have a name');
    assert(self.profilePhoto, 'Your Page must have a profile image');
  });

  export const create = withInvariants(
    (props: PageProps): Page => ({
      id: props.id,
      address: props.address,
      attributes: props.attributes,
      description: props.description,
      hours: props.hours,
      name: props.name,
      phone: props.phone,
      profilePhoto: props.profilePhoto,
      photos: props.photos,
      website: props.website,
      status: 'PUBLISHED',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 0,
    })
  );

  export type Type = Page;
}

export { Page };
