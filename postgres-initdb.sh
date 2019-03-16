#!/bin/sh -e

psql --username "postgres" <<-EOSQL
  CREATE DATABASE "NotesDev";
EOSQL