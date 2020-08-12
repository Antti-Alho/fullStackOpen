"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientController_1 = __importDefault(require("../controllers/patientController"));
const patientRouter = express_1.default.Router();
patientRouter.get('/', patientController_1.default.getAll);
patientRouter.post('/', patientController_1.default.addEntry);
exports.default = patientRouter;
