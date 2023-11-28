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
  public createdAt: Date;
  public origin: string;

  constructor({ level, message, origin, createdAt = new Date() }: LogEntityOptions) {
    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createdAt = createdAt;
  }
}
