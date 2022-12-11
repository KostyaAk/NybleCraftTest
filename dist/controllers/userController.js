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
exports.__esModule = true;
exports.pdf = exports.deleteUser = exports.update = exports.getOne = exports.image = exports.createUser = exports.getAll = exports.login = exports.signup = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = require("../entity/user");
var auth_1 = require("../entity/auth");
var orm_1 = require("../orm");
var image_1 = __importDefault(require("../image"));
var pdfkit_1 = __importDefault(require("pdfkit"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, check, hash, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                if (!username || !password) {
                    throw new Error('Empty username or password');
                }
                return [4 /*yield*/, orm_1.AppDataSource.manager.findOneBy(auth_1.Auth, {
                        username: req.body.username
                    })];
            case 1:
                check = _b.sent();
                if (check) {
                    throw new Error('User with this username already exist');
                }
                return [4 /*yield*/, bcrypt_1["default"].hash(password, 5)];
            case 2:
                hash = _b.sent();
                user = orm_1.AppDataSource.manager.create(auth_1.Auth, {
                    username: username,
                    password: hash
                });
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.signup = signup;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, compare, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, orm_1.AppDataSource.manager.findOneBy(auth_1.Auth, { username: username })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new Error('User dont exist in Database');
                }
                compare = bcrypt_1["default"].compareSync(password, user.password);
                if (!compare) {
                    throw new Error('Invalid password');
                }
                token = jsonwebtoken_1["default"].sign({ username: username }, process.env.SECRET_KEY);
                return [2 /*return*/, res.json({ token: token })];
        }
    });
}); };
exports.login = login;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orm_1.AppDataSource.manager.find(user_1.User)];
            case 1:
                users = _a.sent();
                if (!users) {
                    throw new Error('No one user in Database');
                }
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getAll = getAll;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, firstname, lastname, image, user;
    return __generator(this, function (_b) {
        _a = req.body, email = _a.email, firstname = _a.firstname, lastname = _a.lastname;
        image = '';
        user = orm_1.AppDataSource.manager.create(user_1.User, {
            email: email,
            firstname: firstname,
            lastname: lastname,
            image: image
        });
        orm_1.AppDataSource.manager.save(user_1.User, user);
        return [2 /*return*/, res.json(user)];
    });
}); };
exports.createUser = createUser;
var image = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                file = image_1["default"].save(req.files);
                return [4 /*yield*/, orm_1.AppDataSource.manager.findOneBy(user_1.User, { id: Number(req.params.id) })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('User not found in Database');
                }
                user.image = file;
                orm_1.AppDataSource.manager.save(user);
                return [2 /*return*/, res.json(file)];
        }
    });
}); };
exports.image = image;
var getOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orm_1.AppDataSource.manager.findOneBy(user_1.User, {
                    id: Number(req.params.id)
                })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('User not found in Database');
                }
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getOne = getOne;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, email, firstname, lastname, image_2, updatedUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, orm_1.AppDataSource.manager.findOneBy(user_1.User, {
                    id: Number(req.params.id)
                })];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 3];
                _a = req.body, email = _a.email, firstname = _a.firstname, lastname = _a.lastname, image_2 = _a.image;
                orm_1.AppDataSource.manager.update(user_1.User, req.params.id, {
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    image: image_2
                });
                return [4 /*yield*/, orm_1.AppDataSource.manager.save(user)];
            case 2:
                updatedUser = _b.sent();
                return [2 /*return*/, res.json(updatedUser)];
            case 3: return [2 /*return*/, res.status(404).json({
                    msg: 'User not found'
                })];
        }
    });
}); };
exports.update = update;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orm_1.AppDataSource.manager["delete"](user_1.User, req.params.id)];
            case 1:
                deletedUser = _a.sent();
                return [2 /*return*/, res.json(deletedUser)];
        }
    });
}); };
exports.deleteUser = deleteUser;
var pdf = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, doc, file, buf;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, orm_1.AppDataSource.manager.findOneBy(user_1.User, { email: req.body.email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('Can not find such user');
                }
                doc = new pdfkit_1["default"]();
                doc.addPage().fontSize(15).text(user.firstname + user.lastname + user.image);
                file = image_1["default"].save(doc);
                buf = Buffer.from(file);
                user.pdf = buf;
                orm_1.AppDataSource.manager.save(user);
                if (user.pdf) {
                    return [2 /*return*/, res.json(true)];
                }
                return [2 /*return*/, res.json(false)];
        }
    });
}); };
exports.pdf = pdf;
//# sourceMappingURL=userController.js.map