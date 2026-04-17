/**
 * @module BarbeariaServices
 * @description Services responsável por gerenciamento das barbearias.
 */

import db from "../../models/database.js";
import * as barberShop from "../../db/barbearia.js";
import { createJwt, createRefreshToken } from "../../utils/jwt.js";
import { v7 as uuidv7 } from "uuid";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const registerBarberShop = async (body) => {
  const id_barbearia = uuidv7();
  const senhaHash = await bcrypt.hash(body.senha, 10);

  const refreshToken = createRefreshToken({
    id: id_barbearia,
    type: "barbearia",
    expired: "7d",
  });

  const [result] = await db
    .insert(barberShop.cadastrar_barbearia)
    .values({
      id_barbearia,
      nome: body.nome,
      email: body.email,
      senha: senhaHash,
      telefone: body.telefone,
      data_cadastro: new Date(),
      refresh_token: refreshToken,
    })
    .returning();

  if (!result) {
    return { status: false, mensagem: "Erro ao cadastrar barbearia" };
  }

  const access_token = createJwt({
    id: id_barbearia,
    type: "barbearia",
    expired: "7d",
  });

  return {
    status: true,
    id_barbearia,
    access_token: access_token,
    refreshToken: refreshToken,
  };
};

export const loginBarberShop = async (body) => {
  const [user] = await db
    .select()
    .from(barberShop.login_barbearia)
    .where(eq(barberShop.login_barbearia.email, body.email));

  if (!user) {
    return { status: false, mensagem: "Credenciais invalidas!" };
  }

  const validPassword = await bcrypt.compare(body.senha, user.senha);

  if (!validPassword) {
    return { status: false, mensagem: "Credenciais invalidas!" };
  }

  createRefreshToken({
    id: user.id_barbearia,
    type: "barbeiro",
    expired: "7d",
  });

  return {
    status: true,
    id_barbearia: user.id_barbearia,
    access_token: createJwt({
      id: user.id_barbearia,
      type: "barbeiro",
      expired: "7d",
    }),
  };
};

export const getBarbersShop = async () => {
  return await db.select().from(barberShop.buscar_barbearia);
};

export const getBarberShopId = async (id) => {
  return await db
    .select()
    .from(barberShop.buscar_barbearia)
    .where(eq(barberShop.buscar_barbearia.id_barbearia, id));
};
