import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

export class Server {
  constructor() {}

  public static start() {
    console.log('Starting server...');

    CronService.createJob('* * * * * *', () => {
      console.log('Running cron job...');
      new CheckService(
        () => console.log('Success'),
        (error) => console.log(error),
      ).execute('https://google.com');
    });
  }
}
