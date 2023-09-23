"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const storage_1 = require("@google-cloud/storage");
const common_1 = require("@nestjs/common");
const media_enum_1 = require("../../../common/enums/media.enum");
let UploadService = class UploadService {
    constructor() {
        this.GCP_PROJECT_ID = process.env.GCP_PROJECT_ID || '';
        this.GCP_KEY_FILE_PATH = process.env.GCP_KEY_FILE_PATH || '';
        this.storage = new storage_1.Storage({
            projectId: this.GCP_PROJECT_ID,
            keyFilename: this.GCP_KEY_FILE_PATH,
        });
    }
    async save(database, origin, contentType, media, name, metadata, gcp_bucket = process.env.GCP_BUCKET) {
        try {
            if (!origin || !gcp_bucket || !media || !database) {
                throw new common_1.BadRequestException(`Want data(path, bucket, media)`);
            }
            this.validOrigin(origin);
            name = Date.now() + '-' + name.replace(/ /g, '-');
            const originPath = [database, origin, name].join('/');
            const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
            const file = this.storage.bucket(gcp_bucket).file(originPath);
            const stream = file.createWriteStream();
            await new Promise((resolve, reject) => {
                stream.on('finish', resolve);
                stream.on('error', reject);
                stream.end(media);
            });
            await file.setMetadata({
                metadata: object,
            });
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '2100-01-01',
            });
            return url;
        }
        catch (err) {
            throw new common_1.HttpException('Server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteFile(origin, gcp_bucket = process.env.GCP_BUCKET) {
        const deleteOptions = {};
        await this.storage.bucket(gcp_bucket).file(origin).delete(deleteOptions);
    }
    validOrigin(origin) {
        if (!Object.values(media_enum_1.default).includes(origin)) {
            throw new Error('invalid source path');
        }
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map