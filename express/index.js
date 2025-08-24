const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Root route
app.get('/', (req, res) => {
  res.send('Hallo von Express!');
});

// Middleware to initialize PocketBase for each request
app.use(async (req, res, next) => {
  try {
    const { default: PocketBase } = await import('pocketbase');
    res.locals.pb = new PocketBase('http://127.0.0.1:8090');
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize PocketBase: ' + error.message });
  }
});

// Middleware to authenticate Lehrer routes
async function authenticateLehrer(req, res, next) {
  const pb = res.locals.pb;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  try {
    const token = authHeader.split(' ')[1];
    pb.authStore.save(token);

    // Validate token as a Lehrer
    await pb.collection('lehrer').authRefresh();

    if (!pb.authStore.isValid || pb.authStore.model.collectionName !== 'lehrer') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.lehrerId = pb.authStore.model.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed: ' + error.message });
  }
}

// ========================
// Lehrer signup
// ========================
app.post('/api/lehrer/signup', async (req, res) => {
  const pb = res.locals.pb;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Fehlende Email oder Passwort.' });
  }

  try {
    // Create new teacher
    await pb.collection('lehrer').create({
      email,
      password,
      passwordConfirm: password
    });

    // Immediately log them in
    const authData = await pb.collection('lehrer').authWithPassword(email, password);

    res.json({
      message: 'Lehrer erfolgreich registriert',
      token: authData.token,
      lehrer: authData.record
    });
  } catch (error) {
    res.status(500).json({ error: 'Registrierung fehlgeschlagen: ' + error.message });
  }
});

// ========================
// Lehrer login
// ========================
app.post('/api/lehrer/login', async (req, res) => {
  const pb = res.locals.pb;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Fehlende Email oder Passwort.' });
  }

  try {
    const authData = await pb.collection('lehrer').authWithPassword(email, password);
    res.json({
      token: authData.token,
      lehrer: authData.record
    });
  } catch (error) {
    res.status(401).json({ error: 'Login fehlgeschlagen: ' + error.message });
  }
});

// ========================
// Create Klasse + Students
// ========================
app.post('/api/klasse', authenticateLehrer, async (req, res) => {
  const pb = res.locals.pb;
  const { name, susCount } = req.body;
  const lehrerId = req.lehrerId;

  if (!name || !susCount || susCount < 1) {
    return res.status(400).json({ error: 'Fehlender Name oder ungültige SuS Anzahl' });
  }

  try {
    // Create Klasse
    const klassenRecord = await pb.collection('klassen').create({
      name: name,
      allelehrer: [lehrerId],
      allesus: []
    });

    const susCodes = [];
    const susIds = [];

    for (let i = 0; i < susCount; i++) {
      const code = Math.floor(10000 + Math.random() * 90000).toString();

      const student = await pb.collection('sus').create({
        loginCode: code,                         // unique login code
        email: `${code}@placeholder.com`,
        password: code,
        passwordConfirm: code,
        klasse_: klassenRecord.id,
        fortschritt: {}
      });

      susCodes.push(code);
      susIds.push(student.id);
    }

    // Update Klasse with student IDs
    await pb.collection('klassen').update(klassenRecord.id, {
      allesus: susIds
    });

    res.json({
      message: 'Klasse erfolgreich angelegt',
      klasse: {
        id: klassenRecord.id,
        name: name
      },
      susCodes: susCodes
    });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Anlegen der Klasse: ' + error.message });
  }
});

// ========================
// Student login
// ========================
app.post('/api/sus/login', async (req, res) => {
  const pb = res.locals.pb;
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Fehlender Code' });
  }

  try {
    const student = await pb.collection('sus').getFirstListItem(`loginCode="${code}"`);

    if (!student) {
      return res.status(404).json({});
    }

    res.json({
      id: student.loginCode,      // expose login code as "id" for frontend
      fortschritt: student.fortschritt,
      klasse_: student.klasse_
    });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({});
    }
    res.status(500).json({ error: 'Fehler beim Login: ' + error.message });
  }
});

// ========================
// Start Express server
// ========================
app.listen(port, () => {
  console.log(`Express-Server läuft auf http://localhost:${port}`);
});
