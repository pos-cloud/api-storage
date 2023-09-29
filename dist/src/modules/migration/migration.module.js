"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationModule = void 0;
const common_1 = require("@nestjs/common");
const migration_service_1 = require("./services/migration.service");
const migration_controller_1 = require("./controllers/migration.controller");
const database_module_1 = require("src/database/database.module");
const upload_module_1 = require("../upload/upload.module");
let MigrationModule = class MigrationModule {
};
exports.MigrationModule = MigrationModule;
exports.MigrationModule = MigrationModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, upload_module_1.UploadModule],
        controllers: [migration_controller_1.MigrationController],
        providers: [migration_service_1.MigrationService],
    })
], MigrationModule);
//# sourceMappingURL=migration.module.js.map