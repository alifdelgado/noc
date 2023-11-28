import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogLevels } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface SendEmailLogUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error('Email not sent');
      }
      const log = new LogEntity({
        level: LogLevels.low,
        message: 'Email sent',
        origin: 'send-email-logs.ts',
      });
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogLevels.high,
        message: `${error}`,
        origin: 'send-email-logs.ts',
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
