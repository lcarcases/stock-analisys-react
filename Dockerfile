FROM node:16.3.0

WORKDIR /var/www/html/localhost/stock-analisis-react

COPY package.json .

COPY .env .

COPY ./public ./public

COPY ./src ./src

RUN npm install -g npm@7.24.0

RUN npm install

RUN npm install --save-dev @wojtekmaj/enzyme-adapter-react-17

RUN npm install --save-dev enzyme-to-json

EXPOSE 3001

CMD ["npm", "start", "-y"]
