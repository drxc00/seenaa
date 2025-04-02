CREATE TABLE "user_domain" (
	"id" text PRIMARY KEY NOT NULL,
	"domain" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "user_domain_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
ALTER TABLE "user_domain" ADD CONSTRAINT "user_domain_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;