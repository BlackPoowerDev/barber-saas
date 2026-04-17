import * as z from "zod";

export const validationBarberShop = z.object({
  nome: z.string().min(5, "Nome muito curto!"),
  email: z.string().email("Email invalido!"),
  senha: z.string().min(6, "Senha menor que 6 digitos!"),
  telefone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos numéricos"),
});

export const validationBarberId = z.object({
  id: z.string().uuid("Id do usuario invalido"),
});
