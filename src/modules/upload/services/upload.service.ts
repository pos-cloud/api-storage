import { Storage } from '@google-cloud/storage';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UploadService {
  private readonly storage: Storage;
  private GCP_PROJECT_ID: string;
  private GCP_KEY_FILE_PATH: string;

  constructor() {
    this.GCP_PROJECT_ID = process.env.GCP_PROJECT_ID || '';
    this.GCP_KEY_FILE_PATH = process.env.GCP_KEY_FILE_PATH || '';
    this.storage = new Storage({
      projectId: this.GCP_PROJECT_ID,
      keyFilename: this.GCP_KEY_FILE_PATH,
    });
  }

  async save(
    path: string,
    contentType: string,
    media: Buffer,
    metadata: { [key: string]: string }[],
    gcp_bucket: string,
  ): Promise<string> {
    if (!path || !gcp_bucket || !media) {
      throw new BadRequestException(`Want data(path, bucket, media)`);
    }
    let paths = path.split('/');
    paths[paths.length - 1] = Date.now() + '-' + paths[paths.length - 1];
    path = paths.join('/');
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(gcp_bucket).file(path);

    const stream = file.createWriteStream();

    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
      stream.end(media);
    });

    await file.setMetadata({
      metadata: object,
    });

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    return url;
  }
}
