/// <reference types="multer" />
import { UploadService } from '../services/upload.service';
import CustomRequest from 'src/common/interfaces/request.interface';
import ORIGINMEDIA from 'src/common/enums/media.enum';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadMedia(file: Express.Multer.File, origin: ORIGINMEDIA, bucket: string, reques: CustomRequest): Promise<string>;
}
