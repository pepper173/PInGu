import app from './appInit.js';

app.get('/', (req, res) => {
    res.send('Hallo vom Express-Backend!');
});

app.get('/api/auth/me', async (req, res) => {
    try {
        const token = req.cookies?.auth;
        if (!token) {
            return res.status(401).json({ error: 'Nicht eingeloggt' });
        }

        const pb = res.locals.pb;
        pb.authStore.save(token, null);

        await pb.collection('lehrer').authRefresh();

        const record = pb.authStore.model;

        const user = {
            id: record.id,
            email: record.email,
            verified: record.verified
        };

        res.json({ user });
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Ungültiges oder abgelaufenes Token' });
    }
});

app.get('/api/allClasses', async (req, res) => {
    const pb = res.locals.pb;
    const classes = await pb.collection('classes').getFullList();
    res.status(200).json(classes);
});

app.post('/api/class', async (req, res) => {
    try {
        const pb = res.locals.pb;
        const { name, lehrerId, childrenCount, grade } = req.body;

        const newClass = await pb.collection('classes').create({
            name,
            lehrerId,
            childrenCount,
            grade
        });

        const students = await generateStudents(
            childrenCount,
            newClass.code,
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

async function generateStudents(numberOfCodes, classCode, pb){
    const newStudents = [];
    for (let i = 0; i < numberOfCodes; i++) {
        const student = await pb.collection("students").create({classCode});
        newStudents.push(student);
    }
    return newStudents;
}

app.post('/api/lehrer/signup', async (req, res) => {
    const pb = res.locals.pb;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Fehlende Email oder Passwort' });
    }

    try {
        const newLehrer = await pb.collection('lehrer').create({
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

app.post('/api/lehrer/login', async (req, res) => {
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

app.post('/api/lehrer/logout', (req, res) => {
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

export default app;