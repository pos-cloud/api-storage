import { DatabaseService } from 'src/database/services/database.service';
import { UploadService } from 'src/modules/upload/services/upload.service';
export declare class MigrationService {
    private readonly databaseService;
    private readonly uploadService;
    constructor(databaseService: DatabaseService, uploadService: UploadService);
    migrationImages(): Promise<void>;
    private arrayPromiseDocument;
    private getDirectory;
}
