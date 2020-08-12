import {Request, Response} from 'express';
import patientData from '../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name , dateOfBirth, gender, occupation}) => ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation
}));
};

const getAll = (_req: Request, res: Response) => {
  res.send(getNonSensitivePatients())
};

const addEntry = (_req: Request, res: Response) => {
  const newPatient: Patient = _req.body as Patient
  patients.push(newPatient);
  res.sendStatus(204)
};

export default {
  getAll,
  addEntry
};
