import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const login_barbearia = pgTable("barbearias", {
  id_barbearia: varchar("id_barbearia", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  senha: varchar("senha", { length: 255 }).notNull(),
});
export const cadastrar_barbearia = pgTable("barbearias", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  id_barbearia: varchar("id_barbearia", { length: 255 }).notNull(),

  nome: varchar("nome", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  senha: varchar("senha", { length: 255 }).notNull(),

  telefone: varchar("telefone", { length: 20 }).notNull().unique(),

  refresh_token: varchar("refresh_token").notNull().unique(),

  data_cadastro: timestamp("data_cadastro").defaultNow(),
});

export const buscar_barbearia = pgTable("barbearias", {
  id_barbearia: varchar("id_barbearia", { length: 255 }).notNull(),

  nome: varchar("nome", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  telefone: varchar("telefone", { length: 20 }).notNull().unique(),

  // refresh_token: varchar("refresh_token").notNull().unique(),

  data_cadastro: timestamp("data_cadastro").defaultNow(),
});

export const atualizar_barbearia = pgTable("barbearias", {
  nome_barbearia: varchar("nome_barbearia", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  senha: varchar("senha", { length: 255 }),

  foto_perfil: varchar("foto_perfil", { length: 255 }),

  endereco: varchar("endereco", { length: 255 }),

  telefone: varchar("telefone", { length: 20 }),

  descricao: varchar("descricao", { length: 500 }),
});
