FROM node:alpine

WORKDIR /web-challenge

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "server"]