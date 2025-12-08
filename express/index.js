const express = require('express');
const cors = require('cors');
const PocketBase = require('pocketbase/cjs');
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';

const app = express();
const port = 3000;

app.use(cors()); //TODO: cors config for production
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hallo vom Express-Backend!');
});

// Middleware to initialize PocketBase
app.use(async (req, res, next) => {
  try {
    res.locals.pb = new PocketBase(POCKETBASE_URL);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Initialisieren von PocketBase: ' + error.message });
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

//TODO also check against class code.
//TODO set studentCode as used
app.get('/api/studentCode/:studentCode', async (req, res) => {
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

app.get('/api/allClasses', async (req, res) => {
  const pb = res.locals.pb;
  const classes = await pb.collection('classes').getFullList();
  res.status(200).json(classes);
});


// // Middleware to authenticate Lehrer
// async function authenticateLehrer(req, res, next) {
//   const pb = res.locals.pb;
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: 'Kein Autorisierungs-Header angegeben' });
//   }

//   try {
//     const token = authHeader.split(' ')[1];
//     pb.authStore.save(token);
//     await pb.collection('lehrer').authRefresh();
//     if (!pb.authStore.isValid || pb.authStore.model.collectionName !== 'lehrer') {
//       return res.status(401).json({ error: 'Ungültiger oder abgelaufener Lehrer-Token' });
//     }
//     req.lehrerId = pb.authStore.model.id;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Authentifizierung fehlgeschlagen: ' + error.message });
//   }
// }

// // Generate unique 5-digit loginCode
// async function generateUniqueCode(pb) {
//   let code;
//   let exists = true;
//   while (exists) {
//     code = Math.floor(10000 + Math.random() * 90000).toString();
//     try {
//       await pb.collection('sus').getFirstListItem(`loginCode="${code}"`);
//     } catch (error) {
//       if (error.status === 404) exists = false;
//     }
//   }
//   return code;
// }

// // Lehrer signup
// app.post('/api/lehrer/signup', async (req, res) => {
//   const pb = res.locals.pb;
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Fehlende Email oder Passwort' });
//   }

//   try {
//     const newLehrer = await pb.collection('lehrer').create({
//       email,
//       password,
//       passwordConfirm: password,
//       emailVisibility: true,
//       verified: false,
//       klassen: []
//     });

//     // Brief delay to ensure record is ready for auth
//     await new Promise(resolve => setTimeout(resolve, 500));

//     const authData = await pb.collection('lehrer').authWithPassword(email, password);
//     res.json({
//       message: 'Lehrer erfolgreich registriert',
//       token: authData.token,
//       lehrer: authData.record
//     });
//   } catch (error) {
//     res.status(400).json({ error: 'Registrierung fehlgeschlagen: ' + error.message });
//   }
// });

// // Lehrer login
// app.post('/api/lehrer/login', async (req, res) => {
//   const pb = res.locals.pb;
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Fehlende Email oder Passwort' });
//   }

//   try {
//     const authData = await pb.collection('lehrer').authWithPassword(email, password);
//     res.json({
//       token: authData.token,
//       lehrer: authData.record
//     });
//   } catch (error) {
//     res.status(401).json({ error: 'Login fehlgeschlagen: ' + error.message });
//   }
// });

// // Create Klasse + Students
// app.post('/api/klasse', authenticateLehrer, async (req, res) => {
//   const pb = res.locals.pb;
//   const { name, susCount } = req.body;
//   const lehrerId = req.lehrerId;

//   console.log('Request body for /api/klasse:', req.body);
//   console.log('Lehrer ID:', lehrerId);

//   if (!name || !susCount || susCount < 1) {
//     return res.status(400).json({ error: 'Fehlender Name oder ungültige SuS-Anzahl' });
//   }

//   try {
//     // Create Klasse
//     console.log('Creating klassen record...');
//     const klassenRecord = await pb.collection('klassen').create({
//       name,
//       allelehrer: [lehrerId],
//       allesus: []
//     });
//     console.log('Created klassen record:', klassenRecord);

//     // Update lehrer.klassen
//     console.log('Fetching lehrer record...');
//     const lehrer = await pb.collection('lehrer').getOne(lehrerId);
//     const currentKlassen = lehrer.klassen || [];
//     currentKlassen.push(klassenRecord.id);
//     console.log('Updating lehrer.klassen:', currentKlassen);
//     await pb.collection('lehrer').update(lehrerId, { klassen: currentKlassen });

//     const susCodes = [];
//     const susIds = [];
//     console.log('Creating sus records...');
//     for (let i = 0; i < susCount; i++) {
//       const code = await generateUniqueCode(pb);
//       console.log('Creating student with loginCode:', code);
//       const student = await pb.collection('sus').create({
//         loginCode: code,
//         email: `${code}@placeholder.com`,
//         password: `${code}12345`,
//         passwordConfirm: `${code}12345`,
//         emailVisibility: true,
//         verified: false,
//         klasse_: klassenRecord.id,
//         fortschritt: {}
//       });
//       console.log('Created student with ID:', student.id);
//       susCodes.push(code);
//       susIds.push(student.id); // Use student.id for allesus relation
//     }

//     // Update Klasse with student IDs
//     console.log('Updating klassen.allesus with:', susIds);
//     await new Promise(resolve => setTimeout(resolve, 500)); // Add delay
//     await pb.collection('klassen').update(klassenRecord.id, {
//       allesus: susIds
//     });
//     console.log('Updated klassen.allesus successfully');

//     res.json({
//       message: 'Klasse erfolgreich angelegt',
//       klasse: {
//         id: klassenRecord.id,
//         name
//       },
//       susCodes
//     });
//   } catch (error) {
//     console.error('Error in /api/klasse:', error);
//     res.status(500).json({ error: 'Fehler beim Anlegen der Klasse: ' + error.message });
//   }
// });

// // Student login
// app.post('/api/sus/login', async (req, res) => {
//   const pb = res.locals.pb;
//   const { code } = req.body;

//   if (!code) {
//     return res.status(400).json({ error: 'Fehlender Code' });
//   }

//   try {
//     const student = await pb.collection('sus').getFirstListItem(`loginCode="${code}"`);
//     res.json({
//       id: student.loginCode,
//       fortschritt: student.fortschritt,
//       klasse_: student.klasse_
//     });
//   } catch (error) {
//     if (error.status === 404) {
//       return res.status(404).json({});
//     }
//     res.status(500).json({ error: 'Fehler beim Login: ' + error.message });
//   }
// });

// Start Express server
app.listen(port, () => {
  console.log(`Express-Server läuft auf http://localhost:${port}`);
});
