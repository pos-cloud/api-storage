import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/services/database.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class AppService {
  constructor(private readonly database: DatabaseService) {}
  async getHello(database: string, userId: string) {
    await this.database.initConnection(database || '');
    const usersCollection = this.database.getCollection('users');
    const user = await usersCollection.findOne({
      _id: new ObjectId(userId || ''),
    });
    console.log(user);
    return 'Hello World!';
  }
}
