import express from 'express';

const router = express.Router();

// GET /api/h5p/module/:moduleId
router.get('/module/:moduleId', async (req, res) => {
    const pb = res.locals.pb;
    let moduleJSON
    try{
        moduleJSON = await pb.collection('student_module').getFirstListItem(`contentId = "${req.params.moduleId}"`);
    } catch (err) {
        moduleJSON = {};
    }
    res.status(200).json(moduleJSON);
});

// POST /api/h5p/module
router.post('/module', async (req, res) => {
    const pb = res.locals.pb;
    const { contentId, state } = req.body;

    try {
        let existing;
        try {
            existing = await pb.collection('student_module').getFirstListItem(`contentId = "${contentId}"`);
        } catch (err) {
            existing = null;
        }

        if (existing) {
            const updated = await pb.collection('student_module').update(existing.id, { moduleState: state });
            return res.status(200).json(updated);
        } else {
            const studentModule = await pb.collection('student_module').create({ contentId: contentId, moduleState: state });
            return res.status(201).json(studentModule);
        }
    } catch (error) {
        console.error('Upsert student_module failed:', error);
        return res.status(400).json({ error: error.message });
    }
});

export default router;

