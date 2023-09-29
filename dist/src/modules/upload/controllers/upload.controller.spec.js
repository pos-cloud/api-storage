"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const upload_controller_1 = require("./upload.controller");
const upload_service_1 = require("../services/upload.service");
describe('UploadController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [upload_controller_1.UploadController],
            providers: [upload_service_1.UploadService],
        }).compile();
        controller = module.get(upload_controller_1.UploadController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=upload.controller.spec.js.map