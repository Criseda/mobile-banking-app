FROM node:22.17.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "start", "--", "--host", "0.0.0.0"]