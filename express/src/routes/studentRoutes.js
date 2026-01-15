import express from 'express';

const router = express.Router();

// GET /api/students/:classId
router.get('/:classId', async (req, res) => {
    const pb = res.locals.pb;
    const students = await pb.collection('students').getFullList({
        filter: `classId = "${req.params.classId}"`
    });
    res.status(200).json(students);
});

export default router;

