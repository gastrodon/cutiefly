from node:alpine

WORKDIR /app
ADD package.json package.json
RUN yarn install --no-lockfile

ADD . .
RUN apk add --no-cache sqlite yarn
RUN yarn install

ENV CUTIEFLY_HOST cfly.io
ENTRYPOINT node ./index.js
