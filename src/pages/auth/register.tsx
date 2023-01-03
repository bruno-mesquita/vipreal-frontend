import Head from 'next/head';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImSpinner8 } from 'react-icons/im';
import InputMask from 'react-input-mask';
import { MdArrowBack } from 'react-icons/md';

const schema = z.object({
  name: z.string(),
  email: z.string().email('Email invalido!'),
  birthDate: z
    .string()
    .refine((val) => {
      if (!val) return false;
      const [, , year] = val.split('/');
      const result = Math.abs(
        Number(year.replaceAll('_', '')) - new Date().getFullYear()
      );
      return result >= 18;
    }, 'Você deve ter 18 anos ou mais!')
    .transform((val) => {
      const [day, month, year] = val.split('/');
      return new Date(Number(year), Number(month), Number(day));
    }),
  password: z.string().min(8, 'A senha teve ter no minimo 8 caracteres'),
});

type Input = z.input<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Input>({ resolver: zodResolver(schema) });

  const onValid: SubmitHandler<Input> = (input) => {
    const output = schema.parse(input);
  };

  return (
    <>
      <Head>
        <title>Vip Real | Cadastro</title>
      </Head>
      <main className="bg-gray-200 w-full h-[100vh] justify-center flex flex-col items-center">
        <div className="w-1/4">
          <Link
            href="/auth/login"
            className="self-start flex items-center text-gray-800 font-medium mb-1"
          >
            <MdArrowBack className="fill-gray-800" size={20} />
            Voltar
          </Link>
          <form
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col items-center w-full bg-white rounded-lg p-8 shadow-lg"
          >
            <label className="mb-5 w-full">
              <input
                {...register('name', { required: true })}
                placeholder="Nome"
                type="text"
                className="rounded-md w-full"
              />
              {errors.name && (
                <p role="alert" className="text-red-700">
                  {errors.name?.message}
                </p>
              )}
            </label>
            <label className="mb-5 w-full">
              <input
                {...register('email', { required: true })}
                placeholder="Email"
                type="text"
                className="rounded-md w-full"
              />
              {errors.email && (
                <p role="alert" className="text-red-700">
                  {errors.email?.message}
                </p>
              )}
            </label>
            <label className="mb-5 w-full">
              <InputMask
                mask="99/99/9999"
                {...register('birthDate', { required: true })}
                placeholder="Data de nascimento"
                type="text"
                className="rounded-md w-full"
              />
              {errors.birthDate && (
                <p role="alert" className="text-red-700">
                  {errors.birthDate?.message}
                </p>
              )}
            </label>
            <label className="w-full">
              <input
                {...register('password', { required: true })}
                placeholder="Senha"
                type="password"
                className="rounded-md w-full"
              />
              {errors.password && (
                <p role="alert" className="text-red-700">
                  {errors.password?.message}
                </p>
              )}
            </label>
            <button
              disabled={isSubmitting}
              className="bg-blue-600 w-full flex items-center justify-center text-white font-medium py-2 rounded-md hover:bg-blue-800  transition mt-8 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
            >
              {isSubmitting ? (
                <ImSpinner8 size={18} className="animate-spin self-center" />
              ) : (
                'Cadastrar'
              )}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
