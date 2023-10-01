/// <reference types="node" />
import ORIGINMEDIA from 'src/common/enums/media.enum';
export declare class UploadService {
    private readonly storage;
    private GCP_PROJECT_ID;
    private GCP_KEY_FILE_PATH;
    constructor();
    save(database: any, origin: ORIGINMEDIA, contentType: string, media: Buffer, name: string, metadata: {
        [key: string]: string;
    }[], gcp_bucket?: string): Promise<string>;
    deleteFile(origin: string, gcp_bucket?: string): Promise<void>;
    private validOrigin;
}
