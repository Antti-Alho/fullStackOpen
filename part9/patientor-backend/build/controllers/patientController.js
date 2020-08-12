"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../data/patients.json"));
const patients = patients_json_1.default;
const getAll = () => {
    return patients;
};
const addEntry = (patient) => {
    patients.push(patient);
    return patients;
};
exports.default = {
    getAll,
    addEntry
};
