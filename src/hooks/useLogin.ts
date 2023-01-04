import { useCallback } from 'react';

import type { Input } from '@components/auth/LoginForm';

export function useLogin() {
  return useCallback((input: Input) => {
    throw new Error('method not mplemented');
    // Call api
  }, []);
}
