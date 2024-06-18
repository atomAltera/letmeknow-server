FROM node:14-alpine as build

WORKDIR /opt/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY config-overrides.js ./
COPY src ./src
COPY public ./public

RUN npm install
RUN npm run build

FROM nginx:1.19.0-alpine

RUN apk add --no-cache bash

RUN rm -rf /var/www/html/*
RUN rm -rf /etc/nginx/conf.d/*

COPY --from=build /opt/app/build /var/www/html/

WORKDIR /opt/app

COPY exec.sh /opt/app/exec.sh
COPY nginx.site.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


CMD bash /opt/app/exec.sh

