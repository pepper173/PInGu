import express from 'express';
import {requireStudentAuth, createStudentSession, removeSession} from '../middleware/studentAuth.js';

const router = express.Router();

// GET /api/auth/student
router.get('/', requireStudentAuth, async (req, res) => {
    const pb = res.locals.pb;
    const user = await pb.collection('students').getOne(req.student.id);
    res.status(200).json({user: user});
});

// POST /api/auth/student/login
router.post('/login', async (req, res) => {
    const { code } = req.body;
    const pb = res.locals.pb;

    if (!code || !/^[A-Z0-9]{6}$/.test(code)) {
        return res.status(400).json({ error: 'Invalid code format' });
    }

    let user;

    try {
        user = await pb.collection('students').getFirstListItem(
            `studentCode="${code}"`
        );
    } catch {
        return res.status(401).json({ error: 'Invalid code' });
    }

    const sessionId = createStudentSession(user.id);

    res.cookie('session', sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(201).json({ user: user });
});

// POST /api/auth/student/logout
router.post('/logout', (req, res) => {
    const sessionId = req.cookies.session;

    if (sessionId){
        removeSession(sessionId);
    }

    res.clearCookie('session', { path: '/' });

    return res.status(200).json({ success: true });
});

export default router;

