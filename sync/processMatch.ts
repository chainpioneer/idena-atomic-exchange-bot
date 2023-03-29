import { Log } from 'web3-core'
import sendMessageToPublic from '../notifications/sendMessageToPublic'


export default async function processMatch(event: Log) {
    const secretHash = event.topics[1]
    await sendMessageToPublic(
      `Order #matched ${secretHash}`
    )
}