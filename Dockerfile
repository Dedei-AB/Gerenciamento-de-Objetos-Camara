FROM node:18

WORKDIR /app

# Copia só package.json para instalar dependências primeiro
COPY package*.json ./

RUN npm install

# Copia o resto do código
COPY . .

EXPOSE 3000

COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh
CMD ["./wait-for.sh", "db:3306", "--", "node", "app.js"]
