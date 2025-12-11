import express from 'express';
import cors from 'cors';
import PocketBase from 'pocketbase/cjs';
import cookieParser from 'cookie-parser';

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';

const app = express();
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
})); //TODO: cors config for production
app.use(express.json());
app.use(cookieParser());

app.use(async (req, res, next) => {
    try {
        res.locals.pb = new PocketBase(POCKETBASE_URL);
        next();
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Initialisieren von PocketBase: ' + error.message });
    }
});

export default app;