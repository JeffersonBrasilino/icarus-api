import {Provider} from "@nestjs/common";
import {NodemailerEmail} from "@infrastructure/email/nodemailer/nodemailer.email";

export const SendEmailProvider: Provider = {
    provide: 'ISendEmailProvider',
    useClass: NodemailerEmail
}