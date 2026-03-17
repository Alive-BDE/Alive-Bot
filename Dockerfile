FROM node:25-alpine

WORKDIR /alive
COPY package*.json ./
RUN npm ci
COPY src/ ./src/

CMD ["npm", "start"]