"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.getAllUsers = void 0;
var zod_1 = require("zod");
var auth_service_1 = require("./auth.service");
var AuthError_1 = require("./AuthError");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getAllUsers(req, res) {
    var connection = req.app.get("connection");
    connection.query("select * from Users", function (err, result) {
        if (err) {
            res.status(500).send(err);
        }
        res.send(result);
    });
}
exports.getAllUsers = getAllUsers;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var loginSchema, connection, _a, email, password, _b, user_id, firstname, lastname, token, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    loginSchema = zod_1.z.object({
                        email: zod_1.z.string().email(),
                        password: zod_1.z
                            .string()
                            .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*?&])[a-z\d@$!.%*?&]+$/),
                    });
                    connection = req.app.get("connection");
                    _a = loginSchema.parse(req.body), email = _a.email, password = _a.password;
                    return [4 /*yield*/, (0, auth_service_1.Login)(connection, email, password)];
                case 1:
                    _b = (_c.sent()), user_id = _b.user_id, firstname = _b.firstname, lastname = _b.lastname;
                    token = jsonwebtoken_1.default.sign({ user_id: user_id, firstname: firstname, lastname: lastname, email: email, role: "user" }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
                    res.cookie("auth-token", token, {
                        maxAge: 3600000,
                        path: "/",
                        secure: false,
                        domain: "localhost",
                    });
                    res.send({ user_id: user_id, firstname: firstname, lastname: lastname, email: email });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    if (error_1 instanceof zod_1.ZodError) {
                        res.status(400).send(error_1);
                    }
                    else if (error_1 instanceof AuthError_1.AuthError) {
                        res.status(400).send(error_1.message);
                    }
                    else {
                        res.status(500).send(error_1);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var registerSchema, connection, _a, email, password, firstname, lastname, _result, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    registerSchema = zod_1.z.object({
                        email: zod_1.z.string().email(),
                        password: zod_1.z
                            .string()
                            .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*?&])[a-z\d@$!.%*?&]+$/),
                        firstname: zod_1.z.string(),
                        lastname: zod_1.z.string(),
                    });
                    connection = req.app.get("connection");
                    _a = registerSchema.parse(req.body), email = _a.email, password = _a.password, firstname = _a.firstname, lastname = _a.lastname;
                    return [4 /*yield*/, (0, auth_service_1.Register)(connection, email, password, firstname, lastname)];
                case 1:
                    _result = _b.sent();
                    res.status(201).send("success");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    if (error_2 instanceof zod_1.ZodError) {
                        res.status(400).send(error_2);
                    }
                    else if (error_2 instanceof AuthError_1.AuthError) {
                        res.status(400).send(error_2.message);
                    }
                    else {
                        res.send(500).send(error_2);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
