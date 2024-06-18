#!/bin/sh

docker build --platform linux/amd64 --no-cache --tag atomaltera/letmeknow-frontend:latest ./frontend/ && \
docker build --platform linux/amd64 --no-cache --tag atomaltera/letmeknow-backend:latest ./backend/ && \
docker push atomaltera/letmeknow-frontend:latest && \
docker push atomaltera/letmeknow-backend:latest
