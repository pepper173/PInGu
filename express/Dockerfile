# Node.js-Image als Basis
FROM node:22-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# package.json kopieren und Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Code kopieren
COPY . .

# Port öffnen
EXPOSE 3000

# Den Express-Server starten
CMD ["node", "index.js", "dev"]