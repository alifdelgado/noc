import { LogModel } from '../../data/mongo/models/log.model';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevels } from '../../domain/entities/log.entity';

export class MongoLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    await newLog.save();
    console.log('Mongo log created', newLog.id);
  }
  async getLogs(logLevel: LogLevels): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: logLevel });
    return logs.map(({ level, message, origin, createdAt }: { [key: string]: any }) => {
      return new LogEntity({
        level,
        message,
        origin,
        createdAt,
      });
    });
  }
}
