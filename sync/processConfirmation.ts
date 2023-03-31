import { Log } from 'web3-core'
import splitEventData from '../utils/splitEventData'
import { formatAddress } from '../utils/formatAddress'
import getOrderState from '../utils/getOrderStateIdena'
import sendMessageToSentry from '../notifications/sendMessageToSentry'
import * as idenaProvider from '../provider/idena'
import sendMessageToPublic from '../notifications/sendMessageToPublic'
import config from '../constants/config'

const minTimeGnosis = 30n * 60n
const minTimeIdena = 60n * 60n

export default async function processConfirmation(event: Log) {
    const secretHash = event.topics[1]
    const [amountXDAIHex, payoutAddress, deadlineHex] = splitEventData(event.data, formatAddress)

    const amountXDAI = BigInt(amountXDAIHex)
    const gnosisDeadline = BigInt(deadlineHex)

    const idenaOrder = await getOrderState(secretHash)

    if (amountXDAI !== idenaOrder.amountXDAI) {
      await sendMessageToSentry(
        `Incorrect amountXDAI in order confirmation: ${secretHash}`
        + `\nGnosis amountXDAI ${amountXDAI}`
        + `\nIdena amountXDAI ${idenaOrder.amountXDAI}`
      )
      return
    }

    const { height, timestamp } = await idenaProvider.getLastBlock() as any


    const idenaDeadline = BigInt((idenaOrder.expirationBlock - height) * 20 + timestamp)

    const now = BigInt(Math.ceil(new Date().getTime() / 1000))

    const isValidOrder = (idenaDeadline > now + minTimeIdena) && (gnosisDeadline > now + minTimeGnosis)

    if (!isValidOrder) {
      await sendMessageToSentry(
        `Not enough time in order: ${secretHash}.`
      + `\nIdena deadline ${idenaDeadline} should be at least ${now + minTimeIdena}`
      + `\nGnosis deadline ${gnosisDeadline} should be at least ${now + minTimeGnosis}`
      )
      return
    }

    if (payoutAddress !== formatAddress(idenaOrder.payoutAddress)) {
      await sendMessageToSentry(
        `Incorrect payoutAddress in order confirmation: ${secretHash}`
        + `\nGnosis payout address ${payoutAddress}`
        + `\nIdena payout address ${formatAddress(idenaOrder.payoutAddress)}`
      )
      return
    }

    const rate = amountXDAI * 10000n / idenaOrder.amountDNA
    const dnaAmount = (Number(idenaOrder.amountDNA) / 1e18).toFixed(2)
    const xdaiAmount = (Number(amountXDAI) / 1e18).toFixed(2)

    await sendMessageToPublic(
      `Order #created <a href="${config.appBaseUrl}/order/${secretHash}">${secretHash}</a>`
      + `\n${dnaAmount} DNA -> ${xdaiAmount} XDAI`
      + `\nExchange rate ${Number(rate) / 10000} XDAI per DNA`
    )
}