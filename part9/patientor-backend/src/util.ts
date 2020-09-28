/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */ 
import { Patient, Gender, Entry } from './types';

let currentID = 0;

const newID = (): string => {
  currentID++;
  return `${currentID}`;
};
  
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (text: any, fieldName: string): string => {
if (!text || !isString(text)) {
  throw new Error(`Incorrect value in text field ${fieldName}`);
}
return text;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender`);
  }
  return gender;
};

const isEntry = (entry: any): entry is Entry[] => {
  if (entry instanceof Array) return true;
  return false;
};

const parseEntry = (entry: any): Entry[] => {
  if (!entry || !isEntry(entry)) {
    throw new Error(`Incorrect or missing Entry array`);
  }
  return entry;
};

export const toPatient = (object: any): Patient => {
  const newPatient: Patient = {
      id: newID(),
      name: parseStringField(object.name, 'name'),
      dateOfBirth: parseStringField(object.dateOfBirth, 'dateOfBirth'),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation, 'occupation'),
      ssn: parseStringField(object.ssn, 'ssn'),
      entries: parseEntry(object.entry),
  };
  return newPatient;
};
  