FROM node:16.3.0

WORKDIR /var/www/html/localhost/stock-analisis-react

COPY package.json .

COPY .env .

COPY ./public ./public

COPY ./src ./src

RUN npm install -g npm@7.24.0

RUN npm install

EXPOSE 3001

CMD ["npm", "start", "-y"]
