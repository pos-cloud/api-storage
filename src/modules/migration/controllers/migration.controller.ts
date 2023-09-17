import { Controller, Post } from '@nestjs/common';
import { MigrationService } from '../services/migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}


  @Post()
  async migrationResource(){
   return this.migrationService.migrationImages();
  }
}
