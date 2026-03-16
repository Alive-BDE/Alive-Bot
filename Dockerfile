FROM node:25-alpine

WORKDIR /alive
RUN npm ci
CMD ["npm", "start"]