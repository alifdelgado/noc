import { Log } from './../../node_modules/mongodb/src/mongo_logger';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log-datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementatio';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';
import { LogLevels } from '../domain/entities/log.entity';
import { PostgresDatasource } from '../infrastructure/datasources/postgres-datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

// const fileSystemLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());
// const emailService = new EmailService();
const logRepository = new LogRepositoryImplementation(
  // new FileSystemDatasource(),
  // new MongoLogDatasource()
  new PostgresDatasource(),
);

const fsLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImplementation(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImplementation(new PostgresDatasource());
export class Server {
  constructor() {}

  public static async start() {
    console.log('Starting server...');
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute('nonserviam91@gmail.com');
    // emailService.sendEmailWithFileSystemLogs('nonserviam91@gmail.com');
    const logs = await logRepository.getLogs(LogLevels.low);
    console.log(logs);
    CronService.createJob('* * * * * *', () => {
      console.log('Running cron job...');
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log('Success'),
        (error) => console.log(error),
      ).execute('https://localhost:3000');
    });
  }
}
