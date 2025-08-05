"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadListRouter = exports.routerLogin = exports.routerRegister = exports.routerUpload = void 0;
const UploadRouter_1 = __importDefault(require("./UploadRouter"));
exports.routerUpload = UploadRouter_1.default;
const register_1 = __importDefault(require("./register"));
exports.routerRegister = register_1.default;
const login_1 = __importDefault(require("./login"));
exports.routerLogin = login_1.default;
const uploadList_1 = __importDefault(require("./uploadList"));
exports.UploadListRouter = uploadList_1.default;
