import { tabela_clientes, buscar_clientes } from "../db/clientes.js";
import db from "../models/database.js";
import { createJwt } from "../utils/jwt.js";
import { v6 as uuidv6 } from "uuid";
import { eq, sql } from "drizzle-orm";

export async function listUsers(excluirAdmins = true) {
  if (excluirAdmins) {
    return await db
      .select()
      .from(tabela_clientes)
      .where(sql`not ${tabela_clientes.tipo} = 'administrador'`);
  }
  return await db.select().from(tabela_clientes);
}

export async function buscarUsuarios(idBarbearia) {
  return await db
    .select()
    .from(buscar_clientes)
    .where(eq(buscar_clientes.id_barbearia, idBarbearia));
}

export async function criarUsuario(idBarbearia, dados) {
  const id_cliente = uuidv6();

  const [result] = await db
    .insert(tabela_clientes)
    .values({
      id_cliente,
      id_barbearia,
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      idade: dados.idade,
      tipo: dados.tipo ?? "cliente",
      data_cadastro: new Date(),
      bloqueado: false,
      cortes_finalizados: 0,
    })
    .returning();

  if (!result) {
    return { status: false, mensagem: "Erro ao cadastrar usuario" };
  }

  return {
    status: true,
    id: id_cliente,
    access_token: createJwt({
      id: id_cliente,
      type: dados.tipo ?? "cliente",
      expired: "7d",
    }),
  };
}

export async function deletarUsuario(idCliente) {
  return db
    .delete(tabela_clientes)
    .where(eq(tabela_clientes.id_cliente, idCliente));
}

export async function atualizarUsuario(idCliente, dados) {
  return db
    .update(tabela_clientes)
    .set(dados)
    .where(eq(tabela_clientes.id_cliente, idCliente));
}
