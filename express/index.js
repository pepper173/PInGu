

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.send('Hallo von Express!');
});

app.listen(port, () => {
  console.log(`Express-Server läuft auf http://localhost:${port}`);
});


app.use(async (req, res, next) => {
  try {
    // Dynamically import pocketbase
    const { default: PocketBase } = await import('pocketbase');
    res.locals.pb = new PocketBase('http://127.0.0.1:8090');
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize PocketBase: ' + error.message });
  }
});


// Check if user is an authenticated teacher who can create classes
async function authenticateLehrer(req, res, next) {
  const pb = res.locals.pb;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }


  try {
    // Extract token 
    const token = authHeader.split(' ')[1];
    pb.authStore.save(token);


    //validate token as a Lehrer
    await pb.collection('lehrer').authRefresh();
    if (!pb.authStore.isValid || pb.authStore.model.collectionName !== 'lehrer'){
      res.status(401).json({ error: 'Invalid token' });
    }

    req.lehrerId = pb.authStore.model.id;
    next();
  } catch (error) {
    res.status (401).json({ error: 'Authentication failed' + error.message});
  }

}

// POST endpoint to create a new Klasse
// frontend will send a JSON body like {"name": "Klasse 1", "susCount": 30}
app.post('/api/klasse', authenticateLehrer, async (req, res) => {
  const pb = res.locals.pb;
  const {name, susCount } = req.body;
  const lehrerId = req.lehrerId;

  if (!name || !susCount || susCount < 1 ) {
    return res.status(400).json({ error: 'Fehlender Name oder ungueltige SuS Anzahl'})
  }

  try { 
    // Create klassen record, linked to the lehrer
    const klassenRecord = await pb.collection('klassen').create({
      name: name,
      allelehrer: [lehrerId],
      allesus: []
    });

    // Generate and create students
    const susCodes = [];
    for (let i = 0; i < susCount; i++) {
      const code = Math.floor(10000 + Math.random() * 90000).toString();

      const student = await pb.collection('sus').create({
        id: code,
        email: `${code}@placeholder.com`,
        password: code,
        klasse_: klassenRecord.id,
        fortschritt: {}
      });

      susCodes.push(code);
    }

    //update klasse mit den sus IDs ( Login Codes)
    await pb.collection('klassen').update(classRecord.id, {
      allesus: susCodes
    });

    //Response to frontend
    res.json({
      message: 'Klasse erfolgreich angelegt',
      klasse: {
        id: klassenRecord.id,
        name: name
      },
      susCodes: susCodes
    });
  } catch (error) {
    res.status(500).json({error: 'Fehler beim Anlegen der Klasse ' + error.message});
  }
}) 


// POST endpoint for lehrer Login
// Frontend sends {email, password}, backend returns token
app.post('/api/lehrer/login', async (req, res) => {
  const pb = res.locals.pb;
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Fehlende Email oder Passwort.'})
  }
  try {
    const authData = await pb.collection('lehrer').authWithPassword(email, password);
    res.json({
      token: authData.token, // Token sent to frontend for storage
      lehrer: authData.record
    });
  } catch (error) { 
    res.status(401).json({ error: 'Login fehlgeschlagen: ' + error.message });

  }
});

