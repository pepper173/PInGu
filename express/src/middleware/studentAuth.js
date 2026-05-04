/**
 * Authentication middleware for student routes
 */
import crypto from 'crypto';

const sessions = new Map();

/**
 * Middleware to require student authentication
 * Checks for valid session cookie
 */
export function requireStudentAuth(req, res, next) {
    const sessionId = req.cookies.session;

    if (!sessionId || !sessions.has(sessionId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.student = sessions.get(sessionId);
    next();
}

export function createStudentSession(userId) {
    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, {
        id: userId,
        createdAt: Date.now(),
    });
    return sessionId;
}

export function removeSession(sessionId) {
    sessions.delete(sessionId);
}

/**
 * Get sessions map (for debugging or cleanup)
 */
export function getSessions() {
    return sessions;
}

