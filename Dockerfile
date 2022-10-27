FROM node:18-alpine

WORKDIR /app

ARG PORT
ARG NODE_ENV

ENV PORT $PORT
ENV NODE_ENV=production

COPY . ./

RUN yarn install

CMD [ "yarn", "server" ]
