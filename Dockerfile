FROM node:18

WORKDIR /app

# Copia só package.json para instalar dependências primeiro
COPY package*.json ./

RUN npm install

# Copia o resto do código
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
