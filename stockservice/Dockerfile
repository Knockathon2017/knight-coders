FROM mhart/alpine-node:6

MAINTAINER Exzeo

COPY . /app

WORKDIR /app

# Install app
RUN apk update && apk --no-cache add bash libc6-compat && \
  npm install && \
  npm cache clean --force

ENV NODE_ENV=production

CMD ["npm", "start"]
