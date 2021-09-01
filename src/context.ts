import { makeContext } from '@/_lib/Context';
import { logger } from '@/_lib/logger';
import { config } from '@/config';
import { container } from '@/container';
import { messageBundle } from '@/messages';

const { withContext, makeModule } = makeContext({ config, container, logger, messageBundle }, { logger });

export { withContext, makeModule };
