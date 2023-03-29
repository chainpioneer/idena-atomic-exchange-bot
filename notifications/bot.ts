import loadEnv from "../constants/loadEnv";
import TelegramBot from 'node-telegram-bot-api'

const bot: any = new TelegramBot(loadEnv('TELEGRAM_BOT_TOKEN', true), { polling: false })

export default bot