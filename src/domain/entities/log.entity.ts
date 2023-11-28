export enum LogLevels {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public level: LogLevels;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogLevels) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }
}
