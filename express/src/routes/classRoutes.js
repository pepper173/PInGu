import express from 'express';

const router = express.Router();

// GET /api/class/:teacherId
router.get('/:teacherId', async (req, res) => {
    const pb = res.locals.pb;
    const classes = await pb.collection('classes').getFullList({
        filter: `lehrerId = "${req.params.teacherId}"`
    });
    res.status(200).json(classes);
});

// POST /api/class
router.post('/', async (req, res) => {
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

export default router;

