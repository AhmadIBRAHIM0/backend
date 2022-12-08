FROM node:alpine
WORKDIR usr/app
COPY . .
RUN npm i -g @nestjs/cli
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]