import { LogEntity, LogLevels } from '../entities/log.entity';

export interface LogRepository {
  saveLog(log: LogEntity): Promise<void>;
  getLogs(logLevel: LogLevels): Promise<LogEntity[]>;
}
