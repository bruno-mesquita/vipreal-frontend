import { useCallback } from 'react';

import type { Output } from '@components/auth/RegisterForm';

type Input = Output;

export function useRegister() {
  return useCallback((input: Input) => {
    throw new Error('method not mplemented');
    // Call api
  }, []);
}
