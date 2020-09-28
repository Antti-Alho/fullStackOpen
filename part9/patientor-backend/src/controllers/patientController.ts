import {Request, Response} from 'express';
import patientData from '../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';
import { toPatient } from '../util';

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

const getAll = (_req: Request, res: Response): void => {
  res.send(getNonSensitivePatients());
};

const addEntry = (_req: Request, res: Response): void => {
  const newPatient: Patient = toPatient(_req.body);
  try {
    patients.push(newPatient);
    res.status(204).send(newPatient);
  } catch (error) {
    res.sendStatus(500);
  } 
};

const getOne = (req: Request, res: Response): void => {
  try {
    const patient = patients.find( patient => patient.id === req.params.id );
    if (patient) res.status(200).send(patient);
    else res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
};

export default {
  getAll,
  addEntry,
  getOne
};
