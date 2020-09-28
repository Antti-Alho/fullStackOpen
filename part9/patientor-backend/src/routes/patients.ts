import express from 'express';
import patientController from '../controllers/patientController';

const patientRouter = express.Router();

patientRouter.get('/',patientController.getAll);
patientRouter.post('/',patientController.addEntry);
patientRouter.get('/:id',patientController.getOne);
export default patientRouter;