FROM mhart/alpine-node:6
MAINTAINER Exzeo

ENV NODE_ENV=test

RUN mkdir -p /app && \
mkdir -p /app/lib && \
mkdir -p /app/data && \
mkdir -p /app/proto

COPY package.json index.js /app/
COPY lib/* /app/lib/
COPY data/* /app/data/
COPY proto/* /app/proto/

WORKDIR /app

RUN apk update && apk --no-cache add bash libc6-compat && \
  npm install && \
  npm cache clean

ENTRYPOINT ["npm", "start"]
