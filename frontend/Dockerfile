# Nutzen Sie ein Node.js-Image als Basis
FROM node:22-alpine

# Setzen Sie das Arbeitsverzeichnis
WORKDIR /app/frontend

# Kopieren Sie die package.json und die lokale h5p-standalone-Variante
COPY frontend/package*.json ./
COPY h5p-standalone /app/h5p-standalone

# Installieren Sie die Abhängigkeiten ohne Package-Skripte des lokalen file:-Pakets
RUN npm install --ignore-scripts

# Kopieren Sie den Rest des Frontend-Codes
COPY frontend/ ./

# Öffnen Sie den Port, den ng serve verwendet
EXPOSE 4200

# Führen Sie den Server aus
CMD ["npx", "ng", "serve", "--configuration", "production"]
