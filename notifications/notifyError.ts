import sendMessageToSentry from './sendMessageToSentry'

export default async function notifyError(err: string, exit = false) {
    if (!exit) {
        if (err.length < 400) {
            await sendMessageToSentry(err)
        }
        await sendMessageToSentry(`Long error produced, see console`)
    } else {
        if (err.length < 400) {
            await sendMessageToSentry(err)
        }
        await sendMessageToSentry(`Long error produced, see console`)
        process.exit(1)
    }
}