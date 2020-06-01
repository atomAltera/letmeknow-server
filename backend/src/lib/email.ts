import {createTransport} from "nodemailer";

interface Credentials {
    host: string;
    port: number;
    secure: boolean;
    username: string;
    password: string;
    mailFrom: string;
    mailTo: string;
}

/**
 * Takes *message* and sends it to telegram chat using *credentials*
 */
export async function sendEmailMessage(credentials: Credentials, subject: string, message: string) {
    const transporter = createTransport({
        host: credentials.host,
        port: credentials.port,
        secure: credentials.secure,
        auth: {
            user: credentials.username,
            pass: credentials.password,
        },
    });

    await transporter.sendMail({
        from: {address: credentials.mailFrom, name: credentials.mailFrom},
        to: credentials.mailTo,
        subject,
        html: message,
    });
}
