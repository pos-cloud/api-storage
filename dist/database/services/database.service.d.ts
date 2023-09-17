import { Collection } from 'mongodb';
export declare class DatabaseService {
    private client;
    private database;
    private collection;
    constructor();
    initConnection(databaseName: string): Promise<void>;
    getCollection(collectionName: string): Collection<any>;
    closeConnection(): Promise<void>;
}
