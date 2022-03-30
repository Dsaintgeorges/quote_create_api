FROM node:16
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080

CMD [ "node", "index.js" ]