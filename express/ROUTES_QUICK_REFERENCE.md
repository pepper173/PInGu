# Quick Reference: Route Module Structure

## File Organization

```
express/src/
├── routes/
│   ├── routes.js              ← Main router (mounts all routes)
│   ├── studentAuthRoutes.js   ← /api/auth/student/*
│   ├── teacherAuthRoutes.js   ← /api/auth/teacher/*
│   ├── studentRoutes.js       ← /api/students/*
│   ├── classRoutes.js         ← /api/class/*
│   └── h5pRoutes.js           ← /api/h5p/*
└── middleware/
    └── studentAuth.js         ← Shared auth utilities
```

## Adding a New Route to Existing Module

Example: Add a new endpoint to `studentRoutes.js`

```javascript
// In studentRoutes.js
router.get('/:studentId/progress', async (req, res) => {
    const pb = res.locals.pb;
    const progress = await pb.collection('student_progress').getFullList({
        filter: `studentId = "${req.params.studentId}"`
    });
    res.status(200).json(progress);
});
```

Result: New endpoint available at `GET /api/students/:studentId/progress`

## Creating a New Route Module

1. **Create the file** (e.g., `assignmentRoutes.js`)
```javascript
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    // Your logic
});

router.post('/', async (req, res) => {
    // Your logic
});

export default router;
```

2. **Register in `routes.js`**
```javascript
import assignmentRoutes from './assignmentRoutes.js';
app.use('/api/assignments', assignmentRoutes);
```

3. **Done!** Routes now available at `/api/assignments/*`

## Common Patterns

### Protected Route (Student Auth)
```javascript
import { requireStudentAuth } from '../middleware/studentAuth.js';

router.get('/protected', requireStudentAuth, async (req, res) => {
    // req.student is available
    const userId = req.student.userId;
});
```

### PocketBase Access
```javascript
router.get('/', async (req, res) => {
    const pb = res.locals.pb;  // Always available via middleware
    const data = await pb.collection('your_collection').getFullList();
    res.json(data);
});
```

### Error Handling
```javascript
router.post('/', async (req, res) => {
    try {
        const pb = res.locals.pb;
        const result = await pb.collection('items').create(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ error: error.message });
    }
});
```

## Route Path Examples

| Module | Mounted At | Route | Full Path |
|--------|-----------|-------|-----------|
| studentAuthRoutes | `/api/auth/student` | `GET /` | `/api/auth/student` |
| studentAuthRoutes | `/api/auth/student` | `POST /login` | `/api/auth/student/login` |
| classRoutes | `/api/class` | `GET /:teacherId` | `/api/class/:teacherId` |
| h5pRoutes | `/api/h5p` | `GET /module/:id` | `/api/h5p/module/:id` |

## Tips

- ✅ **DO** keep related routes in the same file
- ✅ **DO** use meaningful route and file names
- ✅ **DO** add comments for complex logic
- ✅ **DO** handle errors properly
- ❌ **DON'T** make files too large (split if needed)
- ❌ **DON'T** duplicate code (use middleware)
- ❌ **DON'T** forget to export the router

