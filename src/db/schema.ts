import { boolean, numeric, pgTable, serial, smallint, text, timestamp, varchar, integer } from 'drizzle-orm/pg-core'

export const gameSlots = pgTable('gameSlots', {
  id: serial().primaryKey(),
  gameSlotStatusId: integer('game_slot_status_id').references(() => gameSlotStatuses.id),
  gameStatusId: integer('game_status_id').references(() => gameStatuses.id),
  gameGuideId: integer('game_guide_id').references(() => employees.id),
  giveawayId: integer('giveaway_id').references(() => giveawayTypes.id),
  gameId: integer("game_id").references(() => games.id),
  numGuests: smallint('num_guests').notNull(),
  textSent: boolean('text_sent').default(false),
  seApCall: boolean('se_ap_call').default(false),
  seApCallNotes: text('se_ap_call_notes'),
  gameNotes: text('game_notes'),
  createdAt: timestamp('created_at').defaultNow(),
  scheduledTime: timestamp('scheduled_time').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),

})

export const games = pgTable('games', {
  id: serial().primaryKey(),
  name: text('name').notNull(),
  difficulty: numeric('difficulty').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export const gameStatuses = pgTable('gameStatuses', {
  id: serial().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export const gameSlotStatuses = pgTable('gameSlotStatuses', {
  id: serial().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export const giveawayTypes = pgTable('giveawayTypes', {
  id: serial().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export const employees = pgTable('employees', {
  id: serial().primaryKey(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  rank: integer('rank').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})