import Head from 'next/head';

import { LoginForm } from '@components/auth';

export default function Login() {
  const onSubmit: Parameters<typeof LoginForm>['0']['onSubmit'] = async (
    values
  ) => {};

  return (
    <>
      <Head>
        <title>Vip Real | Login</title>
      </Head>
      <main className="bg-gray-200 w-full h-[100vh] justify-center flex items-center">
        <LoginForm onSubmit={onSubmit} />
      </main>
    </>
  );
}
