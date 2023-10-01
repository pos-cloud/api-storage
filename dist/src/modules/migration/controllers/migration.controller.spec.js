"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const migration_controller_1 = require("./migration.controller");
const migration_service_1 = require("../services/migration.service");
describe('MigrationController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [migration_controller_1.MigrationController],
            providers: [migration_service_1.MigrationService],
        }).compile();
        controller = module.get(migration_controller_1.MigrationController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=migration.controller.spec.js.map