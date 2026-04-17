import * as z from "zod";

export const validationBarber = z.object({
  nome: z.string().min(5, "Nome muito curto!"),
  telefone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos numéricos"),
  especialidades: z.string().min(1, "Escolha pelomenos um especialidade"),
  horario_inicio: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Formato HH:mm"),
  horario_fim: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Formato HH:mm"),
});

export const validationBarberId = z.object({
  id: z.string().uuid("Id do usuario invalido"),
});
