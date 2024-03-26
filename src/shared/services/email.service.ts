import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import * as fs from 'fs-extra';
import * as hbs from 'handlebars';
import * as path from 'path';

import configuration from '../../config';

@Injectable()
export class EmailService {
    constructor(
        @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
    ) {}

    createTransporter() {
        const transporter = createTransport({
          host: this.config.email.host,
          port: +this.config.email.port,
          secure: true,
          auth: {
            user: this.config.email.username,
            pass: this.config.email.password,
          },
          tls: { rejectUnauthorized: false },
        });
        return transporter;
    }

    async sendMail(
        configMail: Mail.Options,
        data: unknown,
        templateName: string,
      ) {
        const transporter = this.createTransporter();
    
        // Register helpers
        // this.helpers();
    
        const emailTemplate = await this.compile(templateName, data);
        const responseEmail = await transporter.sendMail({
          sender: this.config.email.username,
          ...configMail,
          html: emailTemplate,
        });
        return responseEmail;
    }

    async compile(templateName: string, data) {
        const filePath = path.join(
          process.cwd(),
          'templates',
          `${templateName}.hbs`,
        );
        const html = await fs.readFile(filePath, 'utf8');
        return hbs.compile(html, { strict: false })(data);
    }
}
