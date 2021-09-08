import { BaseError, Exception } from '@/_lib/errors/BaseError';
import { makePredicate } from '@/_lib/Predicate';

namespace ExternalProviderError {
  const type = Symbol('External Provider Error');
  const code = 'ExternalProviderError';

  type Props = {
    providerError: {
      message: string;
      type: string;
      code: number;
    };
  };

  export const create = ({ message, providerError }: Props & { message: string }): Exception<Props> =>
    new BaseError<Props>({ type, code, message, meta: { providerError } });

  export const is = makePredicate<Exception<Props>>(type);
}

export { ExternalProviderError };
