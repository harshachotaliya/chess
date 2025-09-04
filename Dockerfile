FROM node:20-alpine

WORKDIR /usr/src/app

COPY chess.js . 

ENTRYPOINT ["node", "chess.js"]
