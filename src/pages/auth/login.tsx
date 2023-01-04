import Head from 'next/head';

import { LoginForm } from '@components/auth';
import { useLogin } from '@hooks/useLogin';

export default function Login() {
  const login = useLogin();

  return (
    <>
      <Head>
        <title>Vip Real | Login</title>
      </Head>
      <main className="bg-gray-200 w-full h-[100vh] justify-center flex items-center">
        <LoginForm onSubmit={login} />
      </main>
    </>
  );
}
