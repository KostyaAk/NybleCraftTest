"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./entity/user");
var auth_1 = require("./entity/auth");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [user_1.User, auth_1.Auth]
});
//# sourceMappingURL=orm.js.map