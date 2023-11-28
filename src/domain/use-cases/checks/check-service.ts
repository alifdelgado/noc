import { LogEntity, LogLevels } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {}
  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEntity({
        level: LogLevels.low,
        message: `Service ${url} working`,
        origin: 'check-service.ts',
      });
      this.logRepository.saveLog(log);
      this.successCallback?.();
      return true;
    } catch (error) {
      const errorMessage = `${error}`;
      const log = new LogEntity({ level: LogLevels.high, message: errorMessage, origin: 'check-service.ts' });
      this.logRepository.saveLog(log);
      this.errorCallback?.(errorMessage);
      return false;
    }
  }
}
