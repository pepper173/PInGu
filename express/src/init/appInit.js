import express from 'express';
import cors from 'cors';
import PocketBase from 'pocketbase/cjs';
import cookieParser from 'cookie-parser';

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';

const app = express();
const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(async (req, res, next) => {
    try {
        const pb = new PocketBase(POCKETBASE_URL);
        pb.authStore.loadFromCookie(req.headers.cookie || '');
        res.locals.pb = pb;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Initialisieren von PocketBase: ' + error.message });
    }
});

export default app;