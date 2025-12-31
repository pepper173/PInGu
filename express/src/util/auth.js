import {verify} from 'node/crypto.d.ts';

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