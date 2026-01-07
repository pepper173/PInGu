# Nutzen Sie ein Node.js-Image als Basis
FROM node:22-alpine

# Setzen Sie das Arbeitsverzeichnis
WORKDIR /app


# Kopieren Sie die package.json und installieren Sie die Abhängigkeiten
COPY package*.json ./
RUN npm install

# Kopieren Sie den Rest des Codes
COPY . .

# Öffnen Sie den Port, den ng serve verwendet
EXPOSE 4200

# Führen Sie den Server aus
CMD ["npx", "ng", "serve", "--configuration", "production"]
