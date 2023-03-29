import is_dev from "../constants/is_dev";
import loadEnv from "../constants/loadEnv";
import bot from "./bot";

const defaultChat = loadEnv('TELEGRAM_CHAT_ID_SENTRY', true)

export default async function sendMessageToSentry(
    text: string,
    chatId = defaultChat,
    form = { parse_mode: 'HTML', disable_web_page_preview: true },
) {
    if (is_dev) {
        console.log(text)
    } else {
        try {
            await (bot as any).sendMessage(chatId, text, form)
        } catch (e) {
            console.error(e)
            setTimeout(() => sendMessageToSentry(text, chatId, form), 5_000)
        }
    }
}