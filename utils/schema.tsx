import { jsonb, integer, pgTable, varchar } from "drizzle-orm/pg-core";


export const prompts = pgTable("prompts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    prompt: varchar({ length: 255 }).notNull(),
  });

export const cases = pgTable("cases", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    message: varchar({ length: 255 }).notNull(),
    expected_output: integer().notNull(),
    //grader: varchar({ length: 255 }).notNull().unique(),
  });
  
export const scores = pgTable("scores", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    postId: integer("prompt_id").references(() => prompts.id),
    ownerId: integer("case_id").references(() => cases.id),
    scores: jsonb(),
  });
