#!/bin/sh

docker build --tag atomaltera/letmeknow-backend:latest ./backend/
docker build --tag atomaltera/letmeknow-frontend:latest ./frontend/

docker push atomaltera/letmeknow-backend:latest
docker push atomaltera/letmeknow-frontend:latest
