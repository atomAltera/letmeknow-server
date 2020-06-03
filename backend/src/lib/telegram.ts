import axios from "axios";

interface Credentials {
    secret: string;
    channelId: string;
}

/**
 * Takes *message* and sends it to telegram chat using *credentials*
 */
export async function sendTelegramMessage(credentials: Credentials, message: string) {
    const urlSafeMessage = encodeURIComponent(message);

    const url = `https://api.telegram.org/bot${credentials.secret}/sendMessage` +
        `?chat_id=${credentials.channelId}`+
        `&text=${urlSafeMessage}` +
        `&parse_mode=html`;

    await axios.get(url);
}
