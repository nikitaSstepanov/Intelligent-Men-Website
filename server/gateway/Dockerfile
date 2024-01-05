FROM node:lts-hydrogen

WORKDIR ./app

COPY package*.json ./

RUN ["npm", "install"]

COPY ./ ./

CMD ["npm", "run", "start:prod"]