import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
    /* to be implemented */
    res.json({ success: true });
});

router.post('/signin', (req, res) => {
    /* to be implemented */
    res.json({ success: true });
});

router.get('/getinfo', (req, res) => {
    res.json({ info: null });
});

router.post('/logout', (req, res) => {
    return res.json({ sucess: true });
});

export default router;
