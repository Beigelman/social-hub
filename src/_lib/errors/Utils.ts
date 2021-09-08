import { AxiosError } from 'axios';

const getErrorDetails = (err: AxiosError) => {
  return err.response?.data?.error;
};

export { getErrorDetails };
