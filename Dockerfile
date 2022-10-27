FROM node:18-alpine

WORKDIR /app

ARG PORT
ARG NODE_ENV

ENV PORT $PORT
ENV NODE_ENV=production

COPY yarn.lock package.json ./
RUN yarn install

COPY . .

CMD [ "yarn", "server" ]
