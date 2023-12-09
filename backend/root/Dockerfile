FROM node:18.3.0-alpine3.16 

# Install bash
RUN apk add --no-cache bash

# Install git
RUN apk add --no-cache git

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 5001

ENV PORT=5001

ENV KAFKA_BROKER="kafka:29092"

CMD ["npm", "run", "start:prod"]

