CREATE TABLE IF NOT EXISTS "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"nm_task" varchar(255),
	"dt_task" date,
	"dt_created" timestamp DEFAULT now(),
	"dt_updated" timestamp DEFAULT now()
);
