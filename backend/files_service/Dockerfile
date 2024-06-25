FROM node:lts-hydrogen

WORKDIR /app

COPY package*.json ./

RUN ["npm", "install"]

COPY ./ ./

RUN ["npm", "run", "migration:run"]

RUN ["npm", "run", "build"]

CMD ["npm", "run", "start:prod"]