CREATE TABLE "employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"rank" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gameSlotStatuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gameSlots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"game_slot_status_id" integer,
	"game_status_id" integer,
	"game_guide_id" integer,
	"giveaway_id" integer,
	"game_id" integer,
	"num_guests" smallint NOT NULL,
	"text_sent" boolean DEFAULT false,
	"se_ap_call" boolean DEFAULT false,
	"se_ap_call_notes" text,
	"game_notes" text,
	"created_at" timestamp DEFAULT now(),
	"scheduled_time" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gameStatuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"difficulty" numeric NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "giveawayTypes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "gameSlots" ADD CONSTRAINT "gameSlots_game_slot_status_id_gameSlotStatuses_id_fk" FOREIGN KEY ("game_slot_status_id") REFERENCES "public"."gameSlotStatuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gameSlots" ADD CONSTRAINT "gameSlots_game_status_id_gameStatuses_id_fk" FOREIGN KEY ("game_status_id") REFERENCES "public"."gameStatuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gameSlots" ADD CONSTRAINT "gameSlots_game_guide_id_employees_id_fk" FOREIGN KEY ("game_guide_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gameSlots" ADD CONSTRAINT "gameSlots_giveaway_id_giveawayTypes_id_fk" FOREIGN KEY ("giveaway_id") REFERENCES "public"."giveawayTypes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gameSlots" ADD CONSTRAINT "gameSlots_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;