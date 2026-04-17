import {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const buscar_clientes = pgTable("clientes", {
  id_barbearia: varchar("id_barbearia", { length: 255 }).notNull(),

  nome: varchar("nome", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  // senha: varchar("senha", { length: 255 }).notNull(),

  telefone: varchar("telefone", { length: 20 }).notNull().unique(),

  idade: integer("idade"),

  tipo: varchar("tipo", { length: 20 }).default("cliente"),

  // foto_perfil: varchar("foto_perfil", { length: 255 }),

  cortes_finalizados: integer("cortes_finalizados").default(0),

  bloqueado: boolean("bloqueado").default(false),

  data_cadastro: timestamp("data_cadastro").defaultNow(),
});
export const tabela_clientes = pgTable("clientes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  id_cliente: varchar("id_cliente", { length: 255 }).notNull(),

  id_barbearia: varchar("id_barbearia", { length: 255 }).notNull(),

  nome: varchar("nome", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  // senha: varchar("senha", { length: 255 }).notNull(),

  telefone: varchar("telefone", { length: 20 }).notNull().unique(),

  idade: integer("idade"),

  tipo: varchar("tipo", { length: 20 }).default("cliente"),

  // foto_perfil: varchar("foto_perfil", { length: 255 }),

  cortes_finalizados: integer("cortes_finalizados").default(0),

  bloqueado: boolean("bloqueado").default(false),

  data_cadastro: timestamp("data_cadastro").defaultNow(),
});
