import sendMessageToPublic from "./sendMessageToPublic";

export default async function notifyError(err: string, exit = false) {
    if (!exit) {
        if (err.length < 400) {
            await sendMessageToPublic(err)
        }
        await sendMessageToPublic(`Long error produced, see console`)
    } else {
        if (err.length < 400) {
            await sendMessageToPublic(err)
        }
        await sendMessageToPublic(`Long error produced, see console`)
        process.exit(1)
    }
}