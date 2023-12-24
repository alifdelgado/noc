import { LogLevel, PrismaClient } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevels } from '../../domain/entities/log.entity';

const prisma = new PrismaClient();

const levelEnum = {
  low: LogLevel.LOW,
  medium: LogLevel.MEDIUM,
  high: LogLevel.HIGH,
};

export class PostgresDatasource implements LogDatasource {
  async saveLog({ message, level, origin }: LogEntity): Promise<void> {
    const newLog = await prisma.logModel.create({ data: { message, level: levelEnum[level], origin } });
    console.log('Postgres log created', newLog.id);
  }
  async getLogs(logLevel: LogLevels): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany({ where: { level: levelEnum[logLevel] } });
    return logs.map(({ level, message, origin, createdAt }: { [key: string]: any }) =>
      LogEntity.objectToEntity({ level, message, origin, createdAt }),
    );
  }
}
