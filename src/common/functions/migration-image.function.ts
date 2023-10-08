import { readFileSync } from 'fs';
import { join } from 'path';

export const readFile = async (
  database: string,
  collection: string,
  filename: string,
) => {
  try {
    if (filename.includes('http')) {
      return null;
    }
    const urlFile = join(
      __dirname,
      '..',
      '..',
      database,
      'images',
      collection,
      filename,
    );

    console.log(urlFile)

    const file = readFileSync(urlFile);
    return file;
  } catch (err) {
    return null;
  }
};
