import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const gameStatsgameStats = pgTable('gameStats', {
  id: serial().primaryKey(),
  title: text().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
