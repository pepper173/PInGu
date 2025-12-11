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

app.get('/api/studentCode/:studentCode', async (req, res) => {
    //TODO also check against class code.
    //TODO set studentCode as used

    const pb = res.locals.pb;
    const { studentCode } = req.params;
    try {
        const code = await pb.collection("studentCodes")
            .getFirstListItem(`code="${studentCode}" && used=false`);
        return res.status(200).json({ valid: true, code });
    } catch (err) {
        return res.status(200).json({ valid: false });
    }
});

app.post('/api/class', async (req, res) => {
    const pb = res.locals.pb;
    const {name, childrenCount, grade, code} = req.body;
    const newClass = await pb.collection('classes').create({
        name,
        childrenCount,
        grade,
        code
    });
    res.status(201).json(newClass);
});

app.post('/api/student', async (req, res) => {
    const heroNames = ['Löwe', 'Tiger', 'Bär', 'Adler', 'Fuchs', 'Wolf', 'Hirsch', 'Eule'];
    const randomIndex = Math.floor(Math.random() * heroNames.length);
    const userName = `${heroNames[randomIndex]}_${Math.floor(100 + Math.random() * 900)}`;

    const pb = res.locals.pb;
    const {studentCode, classCode} = req.body;
    const newStudent = await pb.collection('students').create({
        userName,
        studentCode,
        classCode
    });
    res.status(201).json(newStudent);
})

app.post('/api/lehrer/signup', async (req, res) => {
    const pb = res.locals.pb;
    const {email, password} = req.body;

    try {
        const newLehrer = await pb.collection('lehrer').create({
            email,
            password,
            passwordConfirm: password,
            emailVisibility: true,
            verified: false,
            klassen: []
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        const authData = await pb.collection('lehrer').authWithPassword(email, password);
        res.cookie('auth', authData.token, {
            httpOnly: true,
            secure: false, // TODO in DEV false, in PROD true
            sameSite: "lax", // TODO 'none' + secure:true, wenn Frontend auf anderem Origin
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({
            message: "Lehrer erfolgreich registriert",
            user: authData.record
        });

    } catch (error) {
        res.status(400).json({ error: 'Registrierung fehlgeschlagen: ' + error.message });
    }
});

app.post('/api/lehrer/logout', (req, res) => {
    const pb = res.locals.pb;
    pb.authStore.clear();

    res.clearCookie('auth', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // PROD: true
    });

    res.json({ message: 'Logout erfolgreich' });
});

app.post('/api/lehrer/login', async (req, res) => {
    const pb = res.locals.pb;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Fehlende Email oder Passwort' });
    }

    try {
        const authData = await pb.collection('lehrer').authWithPassword(email, password);
        res.cookie("auth", authData.token, {
            httpOnly: true,
            secure: false,      // in DEV: false, in PROD: true (+ sameSite: 'none')
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            message: "Login erfolgreich",
            user: authData.record
        });

        res.on('finish', () => {
            console.log('Response wurde gesendet mit Status:', res.statusCode);
        });

    } catch (error) {
        res.status(401).json({ error: 'Login fehlgeschlagen: ' + error.message });
    }
});

export default app;