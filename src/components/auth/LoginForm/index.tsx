import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { ImSpinner8 } from 'react-icons/im';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email invalido!'),
  password: z.string().min(8, 'A senha teve ter no minimo 8 caracteres'),
});

type Input = z.infer<typeof schema>;

interface LoginFormProps {
  onSubmit: (input: Input) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Input>({ resolver: zodResolver(schema) });

  const onValid: SubmitHandler<Input> = (input) => onSubmit(input);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col items-center w-4/5  md:w-2/5 lg:w-1/4 bg-white rounded-lg p-8 shadow-lg"
    >
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
          'Entrar'
        )}
      </button>
      <div className="flex items-center w-full">
        <div className="bg-gray-600 h-[1px] w-full" />
        <span className="my-5 mx-2">OU</span>
        <div className="bg-gray-600 h-[1px] w-full" />
      </div>
      <Link
        href="/auth/register"
        className="bg-blue-600 flex items-center justify-center w-full text-white font-medium py-2 rounded-md hover:bg-blue-800 transition-colors cursor-pointer"
      >
        Cadastrar-se
      </Link>
    </form>
  );
}
