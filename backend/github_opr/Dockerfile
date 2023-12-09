FROM node:18-alpine

# Install bash
RUN apk add --no-cache bash

# Install git
RUN apk add --no-cache git

# Install curl
RUN apk add --no-cache curl

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 5000

ENV PORT=5000

ENV KAFKA_BROKER="kafka:29092"

ENV PINATAJWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2ZjI1ODBkNC1jYzZjLTQ0YmMtOTRiMS01ODNhYjZhNjM2ZDgiLCJlbWFpbCI6InRlYW1zaWgyMzI0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyYzBiMzZkNmY0MWZlMmFjOGU4OCIsInNjb3BlZEtleVNlY3JldCI6IjFlNjVlMWU3NWUyZDZjMzMxMzU1NDVmYWIxMDFiZGQyNDAwY2NiM2IyM2RmZjkwMjFiYWYxNzg0MzQ3NjVmY2EiLCJpYXQiOjE2OTUzNTczMDd9.S6OwSeUh8cCgUqeEZQPN9rSv64AqQ-QreUJ-OEfxrcQ"

CMD ["npm", "run", "start:prod"]
