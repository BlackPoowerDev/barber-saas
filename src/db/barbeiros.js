import {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  time,
  uuid,
} from "drizzle-orm/pg-core";

export const barbeiros = pgTable("barbeiros", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  id_barbearia: uuid("id_barbearia", { length: 255 }).notNull(),

  id_barbeiro: uuid("id_barbeiro", { length: 255 }).notNull(),

  telefone: varchar("telefone", { length: 20 }).notNull().unique(),

  nome: varchar("nome", { length: 50 }).notNull(),

  especialidades: varchar("especialidades", { length: 255 }).notNull(),

  horario_inicio: time("horario_inicio").notNull(),

  horario_fim: time("horario_fim").notNull(),

  bloqueado: boolean("bloqueado").default(false),
  data_cadastro: timestamp("data_cadastro").defaultNow(),
});
