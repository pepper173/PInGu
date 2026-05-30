import express from 'express';

const router = express.Router();

// POST /api/cubi/feedback — Save CUBI level feedback + mark completed
router.post('/feedback', async (req, res) => {
    const pb = res.locals.pb;
    const { studentId, levelId, rating } = req.body;

    if (!studentId || !levelId || !rating) {
        return res.status(400).json({ error: 'studentId, levelId und rating sind Pflichtfelder' });
    }

    if (!['happy', 'neutral', 'sad'].includes(rating)) {
        return res.status(400).json({ error: 'rating muss "happy", "neutral" oder "sad" sein' });
    }

    try {
        // Check if feedback already exists for this student+level
        let existing;
        try {
            existing = await pb.collection('cubi_feedback').getFirstListItem(
                `studentId = "${studentId}" && levelId = "${levelId}"`
            );
        } catch (err) {
            existing = null;
        }

        if (existing) {
            // Update existing feedback
            const updated = await pb.collection('cubi_feedback').update(existing.id, {
                rating,
                completed: true,
            });
            return res.status(200).json(updated);
        } else {
            // Create new feedback entry
            const feedback = await pb.collection('cubi_feedback').create({
                studentId,
                levelId,
                rating,
                completed: true,
            });
            return res.status(201).json(feedback);
        }
    } catch (error) {
        console.error('Save cubi_feedback failed:', error);
        return res.status(400).json({ error: error.message });
    }
});

// GET /api/cubi/feedback/:studentId/:levelId — Get feedback for a specific student+level
router.get('/feedback/:studentId/:levelId', async (req, res) => {
    const pb = res.locals.pb;
    const { studentId, levelId } = req.params;

    try {
        const feedback = await pb.collection('cubi_feedback').getFirstListItem(
            `studentId = "${studentId}" && levelId = "${levelId}"`
        );
        return res.status(200).json(feedback);
    } catch (err) {
        return res.status(200).json({ completed: false, rating: null });
    }
});

export default router;