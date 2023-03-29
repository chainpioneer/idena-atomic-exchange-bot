import notifyError from './notifications/notifyError'
import run from './sync/run'

export async function start() {
  await run().catch(async (e: any) => {
    console.trace(e)
    console.log(e)
    await notifyError(String(e), true)
  })
}

start()
