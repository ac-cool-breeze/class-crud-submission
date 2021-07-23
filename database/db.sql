CREATE DATABASE wind;

\c wind

DROP TABLE IF EXISTS "assets";

CREATE TABLE "assets" (
  id SERIAL PRIMARY KEY,
  name TEXT default NULL,
  inges_date INTEGER,
  serial varchar(36) NOT NULL,
  last_inv_date INTEGER,
  active varchar(255) default NULL
);

CREATE TABLE "b_locations" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE "assets_b_locations" (
  id SERIAL PRIMARY KEY,
  assets_id INTEGER,
  locations_id INTEGER
);

INSERT INTO assets ( name, inges_date, serial, last_inv_date, active ) VALUES 
( 'computer', '1626293852', 'SDF8935FG8', '1626293852', true), 
( 'computer', '1594775852', 'SDF8935FF32', '1563153452', true),
( 'computer', '1563153452', 'SDF8935SF83', '1563153452', false),
( 'monitor', '1600132652', 'DALL-3458', '1563153452', true),
( 'monitor', '1563153452', 'DALL-1442', '1563153452', false),
( 'kvm', '1563153452', 'dg-asdga3f', '1563153452', true),
( 'projector', '1602724652', 'mpx4445-df', '1563153452', true)
;