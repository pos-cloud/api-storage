"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const migration_service_1 = require("./migration.service");
describe('MigrationService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [migration_service_1.MigrationService],
        }).compile();
        service = module.get(migration_service_1.MigrationService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=migration.service.spec.js.map