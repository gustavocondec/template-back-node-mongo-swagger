FROM node:14-alpine
#Copiar el conteido de la carpta que contiene a DockerFile al directorio /app dentro del contenedor
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN rm -rf ./node_modules/@types

CMD ["node", "/app/dist/index.js"]
