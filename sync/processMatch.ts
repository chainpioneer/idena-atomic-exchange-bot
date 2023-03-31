import { Log } from 'web3-core'
import sendMessageToPublic from '../notifications/sendMessageToPublic'
import config from '../constants/config'


export default async function processMatch(event: Log) {
    const secretHash = event.topics[1]
    await sendMessageToPublic(
      `Order #matched <a href=${config.appBaseUrl}/order/${secretHash}>${secretHash}`
    )
}