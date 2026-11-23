FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=80

EXPOSE 80

CMD ["node", "index.js"]
