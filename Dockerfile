FROM node:latest

WORKDIR /app
COPY package.json .
RUN npm i -g npm@9.2.0
RUN npm install
COPY . .

CMD npm run start:dev