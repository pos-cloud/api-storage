import { Injectable } from '@nestjs/common';
import ORIGINMEDIA from 'src/common/enums/media.enum';
import { readFile } from 'src/common/functions/migration-image.function';
import { DatabaseService } from 'src/database/services/database.service';
import { UploadService } from 'src/modules/upload/services/upload.service';

@Injectable()
export class MigrationService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly uploadService: UploadService,
  ) {}

  async migrationImages(database: string) {
    await this.databaseService.initConnection(database);
    const collectionEnum = Object.values(ORIGINMEDIA);

    const batchSize = 100; // Tamaño del lote

    for (let collection of collectionEnum) {
      let nameDirectory: string = this.getDirectory(collection);

      const itemCollection = this.databaseService.getCollection(collection);

      let skip = 0;

      while (true) {
        const documents = itemCollection
          .find({
            operationType: { $ne: 'D' },
            picture: { $ne: 'default.jpg' },
          })
          .limit(batchSize)
          .skip(skip);

        if ((await documents.count()) === 0) {
          break; // No hay más documentos
        }

        const arrayItem = await this.arrayPromiseDocument(
          documents,
          database,
          nameDirectory,
          itemCollection,
          collection,
        );

        await Promise.all(arrayItem);

        skip += batchSize;
      }
    }
  }

  private async arrayPromiseDocument(
    documents: any,
    database: string,
    nameDirectory: string,
    itemCollection: any,
    collection: string | ORIGINMEDIA | any,
  ) {
    const promises: Promise<any>[] = [];

    for await (const document of documents) {
      const file = await readFile(database, nameDirectory, document.picture);

      if (file) {
        const newpromise = new Promise(async (resolve, reject) => {
          try {
            const url = await this.uploadService.save(
              database,
              collection,
              '',
              file,
              document.picture,
              [],
              process.env.GCP_BUCKET_MIGRATION,
            );

            await itemCollection.updateOne(
              { _id: document._id },
              {
                $set: { picture: url },
              },
            );

            //delete document;
            resolve(true);
          } catch (err) {
            console.error(`Error processing document: ${err}`);
            resolve(true);
          }
        });

        promises.push(newpromise);
      }
    }

    return promises;
  }

  private getDirectory(collection: string): string {
    let nameDirectory: string = '';

    switch (collection) {
      case 'articles':
        nameDirectory = 'article';
        break;
      case 'categories':
        nameDirectory = 'category';
        break;
      case 'makes':
        nameDirectory = 'make';
        break;
      case 'configs':
        nameDirectory = 'company';
        break;
      case 'resources':
        nameDirectory = 'resource';
        break;
      default:
        nameDirectory = collection;
    }

    return nameDirectory;
  }
}
