import express from 'express';
import diagnoseController from '../controllers/diagnoseController';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/',diagnoseController.getAll);
diagnoseRouter.post('/',diagnoseController.addEntry);

export default diagnoseRouter;