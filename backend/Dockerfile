FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Установка nodemon для разработки
RUN npm install --save-dev nodemon

EXPOSE 4000

# Используем nodemon в режиме разработки
CMD ["npm", "run", "dev"]