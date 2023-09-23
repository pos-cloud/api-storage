"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jwt-simple");
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        var _a;
        if ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) {
            const token = req.headers.authorization.replace(/['"]+/g, '');
            try {
                const dataJWT = jwt.decode(token, process.env.TOKEN_SECRET || '');
                const database = dataJWT === null || dataJWT === void 0 ? void 0 : dataJWT.database;
                const userId = dataJWT === null || dataJWT === void 0 ? void 0 : dataJWT.user;
                req['database'] = database;
                req['userId'] = userId;
                next();
            }
            catch (error) {
                res.status(500).send({ message: error.toString() });
            }
        }
        else {
            res.status(500).send({ message: 'No se encontro authorization' });
        }
    }
};
AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map