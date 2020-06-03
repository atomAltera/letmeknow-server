#!/bin/bash


if [[ -z "$BACKEND_HOST" ]]; then
  BACKEND_HOST=backend
fi

if [[ -z "$BACKEND_PORT" ]]; then
  BACKEND_PORT=3000
fi


sed -i "s/%BACKEND_HOST%/$BACKEND_HOST/g" /etc/nginx/conf.d/default.conf
sed -i "s/%BACKEND_PORT%/$BACKEND_PORT/g" /etc/nginx/conf.d/default.conf

nginx -g 'daemon off;'
