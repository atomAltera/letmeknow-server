FROM node:14-alpine

WORKDIR /opt/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

CMD node build/index.js

