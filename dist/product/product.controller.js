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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByCategoryAndPrice = exports.getSingleProduct = exports.getAllCategories = void 0;
var product_service_1 = require("./product.service");
var zod_1 = require("zod");
function getAllCategories(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    connection = req.app.get("connection");
                    return [4 /*yield*/, (0, product_service_1.GetAllCategories)(connection)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500).send(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllCategories = getAllCategories;
function getSingleProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productScheme, id, connection, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    productScheme = zod_1.z.object({
                        id: zod_1.z.coerce.number()
                    });
                    id = productScheme.parse(req.params).id;
                    connection = req.app.get("connection");
                    return [4 /*yield*/, (0, product_service_1.GetSingleProduct)(connection, id)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    if (error_2 instanceof zod_1.ZodError) {
                        res.status(405).send(error_2);
                    }
                    res.status(500).send(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSingleProduct = getSingleProduct;
function getProductByCategoryAndPrice(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productScheme, _a, category, price, connection, result, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    productScheme = zod_1.z.object({
                        category: zod_1.z.string(),
                        price: zod_1.z.coerce.number()
                    });
                    _a = productScheme.parse(req.params), category = _a.category, price = _a.price;
                    connection = req.app.get("connection");
                    return [4 /*yield*/, (0, product_service_1.GetProductByCategoryAndPrice)(connection, category, price)];
                case 1:
                    result = _b.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    if (error_3 instanceof zod_1.ZodError) {
                        res.status(405).send(error_3);
                    }
                    res.status(500).send(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProductByCategoryAndPrice = getProductByCategoryAndPrice;
