import express from 'express';
import patients from './patients';
import diagnoses from './daignoses';

const router = express.Router();

router.use('/patients', patients);
router.use('/disgnoses', diagnoses);

export default router;