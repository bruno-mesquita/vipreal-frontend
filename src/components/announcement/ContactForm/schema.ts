import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Campo obrigatório!'),
  email: z.string().email('Email invalido!'),
  phone: z
    .string()
    .min(1, 'Campo obrigatório!')
    .transform(
      (arg) => '+55' + arg.replace('(', '').replace(') ', '').replace('-', '')
    ),
});

export const resolver = zodResolver(schema);

export type Input = z.infer<typeof schema>;
