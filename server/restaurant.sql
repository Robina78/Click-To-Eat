\echo 'Delete and recreate restaurant db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE restaurant;
CREATE DATABASE reataurant;
\connect restaurant

\i restaurant-schema.sql
\i restaurant-seed.sql

\echo 'Delete and recreate restaurant_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE restaurant_test;
CREATE DATABASE restaurant_tes;
\connect restaurant_tes

\i restaurant-schema.sql
