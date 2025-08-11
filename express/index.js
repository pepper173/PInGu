const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hallo von Express!');
});

app.listen(port, () => {
  console.log(`Express-Server läuft auf http://localhost:${port}`);
});