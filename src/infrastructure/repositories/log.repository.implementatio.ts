import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevels } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repositories/log.repository';

export class LogRepositoryImplementation implements LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDatasource.saveLog(log);
  }

  async getLogs(logLevel: LogLevels): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(logLevel);
  }
}
