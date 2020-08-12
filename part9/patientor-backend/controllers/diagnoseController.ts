import {Request, Response} from 'express';
import diagnoseData from '../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;

const getAll = (_req: Request, res: Response) => {
  console.log("asd")
  res.send(diagnoses)
};

const addEntry = (req: Request, res: Response) => {
  const newDiagnose: Diagnose = req.body as Diagnose;
  diagnoses.push(newDiagnose);
  res.send(204)
};

export default {
  getAll,
  addEntry
};