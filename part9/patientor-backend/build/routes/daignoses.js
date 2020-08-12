"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseController_1 = __importDefault(require("../controllers/diagnoseController"));
const diagnoseRouter = express_1.default.Router();
diagnoseRouter.get('/', diagnoseController_1.default.getAll);
diagnoseRouter.post('/', diagnoseController_1.default.addEntry);
exports.default = diagnoseRouter;
