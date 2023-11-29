import { connect } from 'mongoose';

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  public static async connect(options: ConnectionOptions) {
    const { mongoUrl, dbName } = options;

    try {
      await connect(mongoUrl, {
        dbName,
      });
      console.log('mongo database connection established');
    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }
  }
}
