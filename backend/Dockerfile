FROM node:14.4.0-alpine

WORKDIR /opt/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm i
RUN npm run build

CMD node build/index.js

