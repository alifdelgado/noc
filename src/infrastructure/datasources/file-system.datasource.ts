import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevels } from '../../domain/entities/log.entity';

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-all.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '');
      }
    });
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = JSON.stringify(log) + '\n';

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (log.level === LogLevels.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    }

    if (log.level === LogLevels.high) {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  async getLogs(logLevel: LogLevels): Promise<LogEntity[]> {
    if (!logLevel) {
      return [];
    }

    return fs
      .readFileSync(this.allLogsPath, 'utf8')
      .split('\n')
      .map((log) => JSON.parse(log))
      .filter((log) => log.level === logLevel);
  }
}
