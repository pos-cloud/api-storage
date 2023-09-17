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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationService = void 0;
const common_1 = require("@nestjs/common");
const media_enum_1 = require("../../../common/enums/media.enum");
const migration_image_function_1 = require("../../../common/functions/migration-image.function");
const database_service_1 = require("../../../database/services/database.service");
const upload_service_1 = require("../../upload/services/upload.service");
let MigrationService = class MigrationService {
    constructor(databaseService, uploadService) {
        this.databaseService = databaseService;
        this.uploadService = uploadService;
    }
    async migrationImages() {
        const database = 'pizzaya';
        await this.databaseService.initConnection(database);
        const conllectionEmun = Object.values(media_enum_1.default);
        const promises = [];
        for (let collection of conllectionEmun) {
            let nameDirectory = this.getDirectory(collection);
            const itemCollection = this.databaseService.getCollection(collection);
            const documents = itemCollection.find({});
            const arrayItem = this.arrayPromiseDocument(documents, database, nameDirectory, itemCollection, collection);
            promises.concat(arrayItem);
        }
        await Promise.all(promises).then((values) => {
            console.log(values);
        });
    }
    async arrayPromiseDocument(documents, database, nameDirectory, itemCollection, collection) {
        var _a, e_1, _b, _c;
        const promises = [];
        try {
            for (var _d = true, documents_1 = __asyncValues(documents), documents_1_1; documents_1_1 = await documents_1.next(), _a = documents_1_1.done, !_a;) {
                _c = documents_1_1.value;
                _d = false;
                try {
                    const document = _c;
                    const file = await (0, migration_image_function_1.readFile)(database, nameDirectory, document.picture);
                    if (file) {
                        const newpromise = new Promise(async (resolve, reject) => {
                            try {
                                const url = await this.uploadService.save(database, collection, '', file, document.picture, [], process.env.GCP_BUCKET_MIGRATION);
                                await itemCollection.updateOne({ _id: document._id }, {
                                    $set: { picture: url },
                                });
                                resolve(true);
                            }
                            catch (errr) {
                                resolve(true);
                            }
                        });
                        console.log(newpromise);
                        promises.push(newpromise);
                    }
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = documents_1.return)) await _b.call(documents_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return promises;
    }
    getDirectory(collection) {
        let nameDirectory = '';
        switch (collection) {
            case 'articles':
                nameDirectory = 'article';
                break;
            case 'categories':
                nameDirectory = 'category';
                break;
            case 'makes':
                nameDirectory = 'make';
                break;
            case 'companies':
                nameDirectory = 'company';
                break;
            case 'resources':
                nameDirectory = 'resource';
                break;
            default:
                nameDirectory = collection;
        }
        return nameDirectory;
    }
};
MigrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        upload_service_1.UploadService])
], MigrationService);
exports.MigrationService = MigrationService;
//# sourceMappingURL=migration.service.js.map