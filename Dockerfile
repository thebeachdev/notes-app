# Compose:
# docker-compose up -d
# --- This is for development(rename file dev.Dockerfile or something) ----

# ---- Base Node ----
FROM node:10-alpine AS base
ARG DEBIAN_FRONTEND=noninteractive
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
# set working directory
# RUN npm install -g -s jest-cli nodemon sequelize-cli pm2 
WORKDIR /opt/notes_api
# Copies the local package.json file to the container
# and utilitie docker container cache to not needing to rebuild
# and install node_modules/ everytime we build the docker, but only
# when the local package.json file changes.
COPY . /opt/notes_api

RUN npm install

RUN npm audit fix --force

CMD npm run docker:dev
EXPOSE 3000 5858 9230