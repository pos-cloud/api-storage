import { MigrationService } from '../services/migration.service';
import CustomRequest from 'src/common/interfaces/request.interface';
export declare class MigrationController {
    private readonly migrationService;
    constructor(migrationService: MigrationService);
    migrationResource(request: CustomRequest): Promise<void>;
}
