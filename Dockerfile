FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

ENV NODE_ENV "docker"

EXPOSE 3000

CMD [ "node", "server.js" ]
