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
    const conllectionEmun = Object.values(ORIGINMEDIA);

    const promises: Promise<any>[] = [];

    for (let collection of conllectionEmun) {
      let nameDirectory: string = this.getDirectory(collection);

      const itemCollection = this.databaseService.getCollection(collection);

      const documents = itemCollection.find({});

      const arrayItem = this.arrayPromiseDocument(
        documents,
        database,
        nameDirectory,
        itemCollection,
        collection,
      );
      promises.concat(arrayItem);
    }

    await Promise.all(promises).then((values) => {
      console.log(values);
    });
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
            resolve(true);
          } catch (errr) {
            resolve(true);
          }
        });
        ///////////////////////////////////
  
        // break
        promises.push(newpromise);
        //   const url = await this.uploadService.save(
        //     database,
        //     collection,
        //     '',
        //     file,
        //     document.picture,
        //     [],
        //     process.env.GCP_BUCKET_MIGRATION,
        //   );
        //   console.log(document._id);
        // //   await itemCollection.updateOne(
        // //     { _id: document._id },
        // //     {
        // //       $set: { picture: url },
        // //     },
        // //   );
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
