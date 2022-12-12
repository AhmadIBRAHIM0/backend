FROM node:latest
WORKDIR usr/app
COPY . .
RUN npm i -g npm@9.2.0
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]