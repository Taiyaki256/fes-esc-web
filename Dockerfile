FROM node:18-alpine

WORKDIR /app

# install yarn
RUN apk add --no-cache yarn

ARG PORT
ARG NODE_ENV

ENV PORT $PORT
ENV NODE_ENV=production

COPY . ./

CMD [ "yarn server" ]
