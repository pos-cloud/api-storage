import { MigrationService } from '../services/migration.service';
export declare class MigrationController {
    private readonly migrationService;
    constructor(migrationService: MigrationService);
    migrationResource(): Promise<void>;
}
