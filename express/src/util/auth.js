import {verify} from 'node/crypto.d.ts';

async function authenticateLehrer(req, res, next) {
    const pb = res.locals.pb;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Kein Autorisierungs-Header angegeben' });
    }

    try {
        const token = authHeader.split(' ')[1];
        pb.authStore.save(token);
        await pb.collection('lehrer').authRefresh();
        if (!pb.authStore.isValid || pb.authStore.model.collectionName !== 'lehrer') {
            return res.status(401).json({ error: 'Ungültiger oder abgelaufener Lehrer-Token' });
        }
        req.lehrerId = pb.authStore.model.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentifizierung fehlgeschlagen: ' + error.message });
    }
}

function authMiddleware(req, res, next) {
    const token = req.cookies.auth;
    if (!token) return res.status(401).json({ error: "Not authenticated" });

    try {
        req.user = verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}