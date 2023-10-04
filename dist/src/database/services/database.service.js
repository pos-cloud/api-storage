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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let DatabaseService = class DatabaseService {
    constructor() {
        this.client = null;
        this.database = null;
        this.collection = null;
    }
    async initConnection(databaseName) {
        try {
            const mongoUri = `${process.env.MONGO_URL || 'mongodb://localhost:27017'}/${databaseName}`;
            if (!this.client) {
                this.client = await mongodb_1.MongoClient.connect(mongoUri);
                this.database = this.client.db(databaseName);
            }
            console.log('Conexión con MongoDB establecida:' + databaseName);
        }
        catch (error) {
            console.error('Error al conectar con MongoDB:', error);
            throw error;
        }
    }
    getCollection(collectionName) {
        if (!this.database) {
            throw new Error('La conexión con la base de datos no ha sido establecida');
        }
        this.collection = this.database.collection(collectionName);
        return this.collection;
    }
    async closeConnection() {
        try {
            if (this.client) {
                await this.client.close();
                console.log('Conexión con MongoDB cerrada');
            }
        }
        catch (error) {
            console.error('Error closing MongoDB connection:', error);
            throw error;
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
//# sourceMappingURL=database.service.js.map