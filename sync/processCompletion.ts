import { Log } from 'web3-core'
import sendMessageToPublic from '../notifications/sendMessageToPublic'
import web3 from '../provider/gnosis'
import sendMessageToSentry from '../notifications/sendMessageToSentry'


export default async function processCompletion(event: Log) {
    const secretHash = event.topics[1]
    let secret
    try {
     secret = web3.eth.abi.decodeParameter('bytes', event.data);
     await sendMessageToPublic(
      `Order #secret_revealed ${secretHash}` +
      `\nSecret: ${secret}`
     )
    } catch (e) {
        await sendMessageToSentry(`\nFailed to decode order secret in completion tx ${event.transactionHash}`)
    }
}