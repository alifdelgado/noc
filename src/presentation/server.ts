import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository.implementatio';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());
const emailService = new EmailService();
export class Server {
  constructor() {}

  public static start() {
    console.log('Starting server...');
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute('nonserviam91@gmail.com');
    // emailService.sendEmailWithFileSystemLogs('nonserviam91@gmail.com');
    // CronService.createJob('* * * * * *', () => {
    //   console.log('Running cron job...');
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log('Success'),
    //     (error) => console.log(error),
    //   ).execute('https://google.com');
    // });
  }
}
