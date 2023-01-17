import { type SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { type Input, resolver } from './schema';

export function ContactForm({ onSubmit }: FormProps<Input>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Input>({ resolver });

  const onValid: SubmitHandler<Input> = (values) => onSubmit(values);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col w-1/4 bg-white shadow-md p-6 rounded-md"
    >
      <h2 className="mb-4 font-medium text-lg self-center">Entre em contato</h2>
      <label className="w-full mb-2">
        <input
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', { required: true })}
          type="text"
          placeholder="Nome"
          className="rounded-md w-full"
        />
        {errors.name && (
          <p role="alert" className="text-red-700">
            {errors.name?.message}
          </p>
        )}
      </label>
      <label className="w-full mb-2">
        <input
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', { required: true })}
          type="email"
          placeholder="Email"
          className="rounded-md w-full"
        />
        {errors.email && (
          <p role="alert" className="text-red-700">
            {errors.email?.message}
          </p>
        )}
      </label>
      <label className="w-full mb-2">
        <InputMask
          mask="(99) 99999-9999"
          aria-invalid={errors.phone ? 'true' : 'false'}
          {...register('phone', { required: true })}
          type="text"
          placeholder="Celular"
          className="rounded-md w-full"
        />
        {errors.phone && (
          <p role="alert" className="text-red-700">
            {errors.phone?.message}
          </p>
        )}
      </label>

      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-600 flex items-center justify-center w-full text-white font-medium py-2 rounded-md hover:bg-blue-800 transition-colors cursor-pointer mt-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
