import app from '../init/appInit.js';
import crypto from 'crypto';

const sessions = new Map();

app.get('/api/auth/student', requireAuth, async (req, res) => {
    const pb = res.locals.pb;
    console.log('cookies:', req.cookies);
    console.log('student:', req.student);
    const user = await pb.collection('students').getOne(req.student.userId);
    res.json(user);
});

app.post('/api/auth/student/login', async (req, res) => {
    const { code } = req.body;
    const pb = res.locals.pb;

    if (!code || !/^[A-Z0-9]{6}$/.test(code)) {
        console.log(code);
        return res.status(400).json({ error: 'Invalid code format' });
    }

    let user;

    try {
        user = await pb.collection('students').getFirstListItem(
            `studentCode="${code}"`
        );
    } catch {
        console.log(`code ${code} not found`);
        return res.status(401).json({ error: 'Invalid code' });
    }

    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, {
        userId: user.id,
        createdAt: Date.now(),
    });

    res.cookie('session', sessionId, {
        httpOnly: true,
        secure: false, //TODO: prod
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24, // 24h
    });

    res.json({ success: true });
});

function requireAuth(req, res, next) {
    const sessionId = req.cookies.session;

    if (!sessionId || !sessions.has(sessionId)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.student = sessions.get(sessionId);
    next();
}

app.post('/api/auth/student/logout', (req, res) => {
    res.clearCookie('session', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // DEV
        path: '/',
    });

    return res.status(200).json({ success: true });
});

app.get('/api/auth/teacher', async (req, res) => {
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

app.post('/api/auth/teacher/signup', async (req, res) => {
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

app.post('/api/auth/teacher/login', async (req, res) => {
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

app.post('/api/auth/teacher/logout', (req, res) => {
    const pb = res.locals.pb;

    pb.authStore.clear();

    const clearCookie = pb.authStore.exportToCookie({
        httpOnly: true,
        secure: false,     // DEV
        sameSite: 'lax',
        path: '/',
        maxAge: 0,         // löscht Cookie
    });

    res.setHeader('Set-Cookie', clearCookie);
    res.json({ message: 'Logout erfolgreich' });
});

app.get('/api/allClasses', async (req, res) => {
    const pb = res.locals.pb;
    const classes = await pb.collection('classes').getFullList();
    res.status(200).json(classes);
});

app.get('/api/students/:classId', async (req, res) => {
    const pb = res.locals.pb;
    const students = await pb.collection('students').getFullList(`classId="${req.params.classId}"`);
    res.status(200).json(students);
})

app.post('/api/class', async (req, res) => {
    try {
        const pb = res.locals.pb;
        const { name, lehrerId, studentCount, grade } = req.body;

        const newClass = await pb.collection('classes').create({
            name,
            lehrerId,
            studentCount,
            grade
        });

        const students = await generateStudents(
            studentCount,
            newClass.id,
            pb
        );

        res.status(201).json({
            class: newClass,
            students
        });
    } catch (error) {
        console.error('Create class failed:', error);
        res.status(400).json({
            message: error.message,
            data: error.data ?? null
        });
    }
});

async function generateStudents(numberOfCodes, classId, pb){
    const newStudents = [];
    for (let i = 0; i < numberOfCodes; i++) {
        const student = await pb.collection("students").create({classId});
        newStudents.push(student);
    }
    return newStudents;
}


export default app;