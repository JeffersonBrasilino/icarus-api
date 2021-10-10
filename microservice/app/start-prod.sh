#! /bin/sh
echo "iniciando app em PRODUCAO..."

npm install

npm run build

npm run start:prod