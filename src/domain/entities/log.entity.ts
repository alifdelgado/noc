export enum LogLevels {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  level: LogLevels;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogLevels;
  public message: string;
  public origin: string;
  public createdAt: Date;

  constructor({ level, message, origin, createdAt = new Date() }: LogEntityOptions) {
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  static objectToEntity({ level, message, origin, createdAt }: { [key: string]: any }): LogEntity {
    return new LogEntity({
      level,
      message,
      origin,
      createdAt,
    });
  }
}
