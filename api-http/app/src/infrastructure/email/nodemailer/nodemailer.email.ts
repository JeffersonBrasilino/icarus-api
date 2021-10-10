import {createTransport, Transporter} from "nodemailer";
import {IsendEmail, SendEmailOptions} from "@infrastructure/email/contract/Isend-email";

export class NodemailerEmail implements IsendEmail {
    private transporter!: Transporter;

    constructor() {
        this.createTransport();
    }

    private createTransport() {
        if (
            process.env.API_SMTP_HOST &&
            process.env.API_SMTP_USERNAME &&
            process.env.API_SMTP_PASSWORD &&
            process.env.API_SMTP_PORT
        ) {
            this.transporter = createTransport({
                host: process.env.API_SMTP_HOST,
                port: parseInt(process.env.API_SMTP_PORT),
                secure: false,
                auth: {
                    user: process.env.API_SMTP_USERNAME,
                    pass: process.env.API_SMTP_PASSWORD
                }
            })
        } else {
            throw Error('credenciais de smtp incorretas ou não existem no arquivo env.');
        }
    }

    async sendEmail(options: SendEmailOptions): Promise<any> {
        return await this.transporter.sendMail(options)
            .then(res => ({success: true, response: res}))
            .catch(err => {
                return {success: false, response: err.response}
            });
    }
}