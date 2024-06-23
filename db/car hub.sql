CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "role" varchar,
  "email" varchar,
  "password_digest" varchar,
  "image_url" varchar,
  "created_at" timestamp
);

CREATE TABLE "cars" (
  "id" integer PRIMARY KEY,
  "model_name" varchar,
  "year" integer,
  "price_per_day" integer,
  "transmission_type" string,
  "body_type" string,
  "category" string,
  "fuel_consumption" string,
  "no_of_seats" integer,
  "fuel_type" string,
  "is_rented" boolean,
  "rating" integer,
  "location" int,
  "created_at" timestamp
);

CREATE TABLE "reviews" (
  "id" integer PRIMARY KEY,
  "car" int,
  "user" int,
  "created_at" timestamp,
  "body" string,
  "title" string,
  "rating" integer
);

CREATE TABLE "bookings" (
  "id" integer PRIMARY KEY,
  "user" int,
  "car" int,
  "start_date" date,
  "end_date" date,
  "pickup_time" timestamp,
  "dropoff_time" timestamp,
  "phone_number" integer,
  "total_price" integer,
  "created_at" timestamp
);

CREATE TABLE "locations" (
  "id" integer PRIMARY KEY,
  "name" string,
  "address" string,
  "phone_number" string
);

ALTER TABLE "cars" ADD FOREIGN KEY ("location") REFERENCES "locations" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("car") REFERENCES "cars" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("car") REFERENCES "cars" ("id");
