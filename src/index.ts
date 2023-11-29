import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo/init';
import { Server } from './presentation/server';

const main = async () => {
  await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL, dbName: envs.MONGO_DB });
  Server.start();
};

(async () => {
  main();
})();
