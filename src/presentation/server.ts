import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementatio';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());

export class Server {
  constructor() {}

  public static start() {
    console.log('Starting server...');

    CronService.createJob('* * * * * *', () => {
      console.log('Running cron job...');
      new CheckService(
        fileSystemLogRepository,
        () => console.log('Success'),
        (error) => console.log(error),
      ).execute('https://google.com');
    });
  }
}
