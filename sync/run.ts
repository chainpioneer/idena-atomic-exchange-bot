import sendMessageToSentry from '../notifications/sendMessageToSentry'
import { loadState, STATE } from './state'
import web3 from '../provider/gnosis'
import syncGnosis from './syncGnosis'

export default async function run() {
  await sendMessageToSentry("started")

  await loadState()

  const { blockNumberGnosis } = STATE

  const currentGnosisBlockNum = await web3.eth.getBlockNumber()

  console.log(currentGnosisBlockNum)

  await syncGnosis(blockNumberGnosis + 1, currentGnosisBlockNum)
}