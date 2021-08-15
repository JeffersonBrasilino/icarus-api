FROM node:14.17-alpine

#RUN apk add --no-cache python g++ make

# cria a pasta, esta pasta é para dizer ao docker que ela é uma pasta compartilhada(para o desenvolvimento funcionar)
#para toda alteração no arquivo ela seja detectada no caintainer
VOLUME ["/app"]

#copia o projeto para o container
COPY ./app /app

WORKDIR /app
