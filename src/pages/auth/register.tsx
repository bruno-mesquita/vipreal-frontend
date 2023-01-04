import Head from 'next/head';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

import { RegisterForm } from '@components/auth';

export default function Register() {
  const onSubmit: Parameters<typeof RegisterForm>['0']['onSubmit'] = async (
    input
  ) => {};

  return (
    <>
      <Head>
        <title>Vip Real | Cadastro</title>
      </Head>
      <main className="bg-gray-200 w-full h-[100vh] justify-center flex flex-col items-center">
        <div className="w-4/5 md:w-2/5 lg:w-1/4">
          <Link
            href="/auth/login"
            className="self-start flex items-center text-gray-800 font-medium mb-1"
          >
            <MdArrowBack className="fill-gray-800" size={20} />
            Voltar
          </Link>
          <RegisterForm onSubmit={onSubmit} />
        </div>
      </main>
    </>
  );
}
