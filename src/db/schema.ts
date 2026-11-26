import { pgTable, boolean, numeric, smallint, serial, text, timestamp, varchar, integer ,uuid,} from 'drizzle-orm/pg-core'

export const gameSlots = pgTable('gameSlots', {
  id: uuid('id').primaryKey().defaultRandom(),
  gameSlotStatusId: integer('game_slot_status_id').references(() => gameSlotStatuses.id).default(1),
  scheduledTime: timestamp('scheduled_time').defaultNow(),
  numGuests: smallint('num_guests'),
  gameId: integer("game_id").references(() => games.id),
  gameStatusId: integer('game_status_id').references(() => gameStatuses.id).default(1),
  guestStatusId: integer('guest_status_id').references(() => guestStatuses.id),
  gameGuideId: integer('game_guide_id').references(() => employees.id),
  guestNotes: text('guest_notes'),
  shiftNotes: text('shift_notes'),
  giveawayId: integer('giveaway_id').references(() => giveawayTypes.id),
  textSent: boolean('text_sent').default(false),
  seApCall: boolean('se_ap_call').default(false),
  seApCallNotes: text('se_ap_call_notes'),
  replays: smallint('replays'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),

})

export const games = pgTable('games', {
  id: serial().primaryKey(),
  name: text('name').notNull(),
  abbrev: varchar('abbrev', { length: 5 }).notNull().default('XXXX'),
  difficulty: numeric('difficulty').notNull(),
})

export const gameStatuses = pgTable('gameStatuses', {
  id: serial().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
})

export const guestStatuses = pgTable('guestStatuses', {
  id: serial().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
})

export const gameSlotStatuses = pgTable('gameSlotStatuses', {
  id: serial().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
})

export const giveawayTypes = pgTable('giveawayTypes', {
  id: serial().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
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
