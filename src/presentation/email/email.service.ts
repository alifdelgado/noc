import { createTransport } from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail({ to, subject, htmlBody, attachments }: SendMailOptions): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs from server';
    const htmlBody = `
            <h1>System logs - NOC</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p>See logs for more details</p>
            `;

    const attachments: Attachment[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
