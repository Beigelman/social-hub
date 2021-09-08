import { asValue } from 'awilix';

import { Publisher } from '@/_lib/events/Publisher';
import { Subscriber } from '@/_lib/events/Subscriber';
import { makeEventEmitterPubSub } from '@/_lib/pubSub/EventEmitterPubSub';
import { makeModule } from '@/context';

const pubSub = makeModule('pubSub', async ({ container: { build, register }, app: { onReady } }) => {
  const eventEmitterPubSub = build(makeEventEmitterPubSub);

  register({
    eventEmitterPubSub: asValue(eventEmitterPubSub),
  });

  onReady(async () => {
    await eventEmitterPubSub.start();
  });

  return async () => {
    await eventEmitterPubSub.dispose();
  };
});

type PubSubRegistry = {
  eventEmitterPubSub: Publisher & Subscriber;
};

export { pubSub };
export type { PubSubRegistry };
