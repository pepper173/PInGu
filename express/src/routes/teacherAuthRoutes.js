import express from 'express';

const router = express.Router();

// GET /api/auth/teacher
router.get('/', async (req, res) => {
    try {
        const pb = res.locals.pb;

        pb.authStore.loadFromCookie(req.headers.cookie || '');

        if (!pb.authStore.isValid) {
            return res.status(401).json({ error: 'Nicht eingeloggt' });
        }

        await pb.collection('lehrer').authRefresh();

        const record = pb.authStore.model;
        res.json({
            user: { id: record.id, email: record.email, verified: record.verified }
        });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Ungültiges oder abgelaufenes Token' });
    }
});

// POST /api/auth/teacher/signup
router.post('/signup', async (req, res) => {
    const pb = res.locals.pb;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Fehlende Email oder Passwort' });
    }

    try {
        await pb.collection('lehrer').create({
            email,
            password,
            passwordConfirm: password,
            emailVisibility: true,
            verified: false,
        });

        const authData = await pb.collection('lehrer').authWithPassword(email, password);

        const pbCookie = pb.authStore.exportToCookie({
            httpOnly: true,
            secure: false,      // DEV: false, PROD: true
            sameSite: 'lax',    // bei cross-origin + https: 'none'
            path: '/',
            maxAge: 24 * 60 * 60,
        });

        res.setHeader('Set-Cookie', pbCookie);

        res.status(201).json({
            message: 'Lehrer erfolgreich registriert',
            user: authData.record,
        });
    } catch (error) {
        res.status(400).json({ error: 'Registrierung fehlgeschlagen: ' + error.message });
    }
});

// POST /api/auth/teacher/login
router.post('/login', async (req, res) => {
    const pb = res.locals.pb;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Fehlende Email oder Passwort' });
    }
    try {
        const authData = await pb.collection('lehrer').authWithPassword(email, password);

        const pbCookie = pb.authStore.exportToCookie({
            httpOnly: true,
            secure: false,      // DEV
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60,
        });

        res.setHeader('Set-Cookie', pbCookie);

        res.json({
            message: 'Login erfolgreich',
            user: authData.record,
        });
    } catch (error) {
        res.status(401).json({ error: 'Login fehlgeschlagen: ' + error.message });
    }
});

// POST /api/auth/teacher/logout
router.post('/logout', (req, res) => {
    const pb = res.locals.pb;

    pb.authStore.clear();

    const clearCookie = pb.authStore.exportToCookie({
        httpOnly: true,
        secure: false,     // DEV
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });

    res.setHeader('Set-Cookie', clearCookie);
    res.json({ message: 'Logout erfolgreich' });
});

export default router;

