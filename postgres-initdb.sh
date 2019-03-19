#!/bin/sh -e

psql --username "postgres" <<-EOSQL
  CREATE DATABASE "notesDev";
EOSQL