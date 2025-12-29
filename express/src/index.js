import app from './routes/routes.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express-Server läuft auf http://localhost:${port}`);
});
