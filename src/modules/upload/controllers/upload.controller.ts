import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../services/upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body('path') path: string,
    @Body('bucket') bucket: string,
  ) {
    return await this.uploadService.save(
      path,
      file.mimetype,
      file.buffer,
      [{ mediaId: path }],
      bucket,
    );
  }
}
