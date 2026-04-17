import db from "../../models/database.js";
import * as barber from "../../db/barbeiros.js";
import { v7 as uuidv7 } from "uuid";
import { eq, and } from "drizzle-orm";

import convertMinutes from "./helpers.js";

export async function createBarber(idBarbearia, body) {
  const inicio = convertMinutes(body.horario_inicio);
  const fim = convertMinutes(body.horario_fim);

  if (fim <= inicio) {
    return {
      status: false,
      error: "O horário de término deve ser após o início.",
    };
  }
  const id_barbeiro = uuidv7();

  await db.insert(barber.barbeiros).values({
    id_barbearia: idBarbearia,
    id_barbeiro,
    telefone: body.telefone,
    nome: body.nome,
    especialidades: body.especialidades,
    horario_inicio: body.horario_inicio,
    horario_fim: body.horario_fim,
    data_cadastro: new Date(),
  });

  return { status: true, id: id_barbeiro };
}

export async function getBarbers(idBarbearia) {
  return await db
    .select()
    .from(barber.barbeiros)
    .where(eq(barber.barbeiros.id_barbearia, idBarbearia))
    .limit(20);
}

export async function getBarberId(idBarbearia, idBarbeiro) {
  return await db
    .select()
    .from(barber.barbeiros)
    .where(
      and(
        eq(barber.barbeiros.id_barbearia, idBarbearia),
        eq(barber.barbeiros.id_barbeiro, idBarbeiro),
      ),
    )
    .limit(1);
}

export async function deleteBarber(idBarbearia, idBarbeiro) {
  const existe = await db
    .select({
      id_barbeiro: barber.barbeiros.id_barbeiro,
    })
    .from(barber.barbeiros)
    .where(
      and(
        eq(barber.barbeiros.id_barbearia, idBarbearia),
        eq(barber.barbeiros.id_barbeiro, idBarbeiro),
      ),
    )
    .limit(1);

  if (existe.length === 0) {
    return {
      status: false,
      error: "Usuário não encontrado ou não pertence a esta barbearia!",
    };
  }

  return db
    .delete(barber.barbeiros)
    .where(
      and(
        eq(barber.barbeiros.id_barbearia, idBarbearia),
        eq(barber.barbeiros.id_barbeiro, idBarbeiro),
      ),
    );
}

export async function updateBarber(idBarbearia, idBarbeiro, body) {
  const exist = await db
    .select({
      id_barbeiro: barber.barbeiros.id_barbeiro,
    })
    .from(barber.barbeiros)
    .where(
      and(
        eq(barber.barbeiros.id_barbearia, idBarbearia),
        eq(barber.barbeiros.id_barbeiro, idBarbeiro),
      ),
    )
    .limit(1);

  if (exist.length === 0) {
    return {
      status: false,
      error: "Usuário não encontrado ou não pertence a esta barbearia!",
    };
  }

  return await db
    .update(barber.barbeiros)
    .set(body)
    .where(
      and(
        eq(barber.barbeiros.id_barbearia, idBarbearia),
        eq(barber.barbeiros.id_barbeiro, idBarbeiro),
      ),
    );
}
