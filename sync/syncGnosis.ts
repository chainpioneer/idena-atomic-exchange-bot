import web3 from '../provider/gnosis'
import config from '../constants/config'
import processConfirmations from './processConfirmation'
import processMatch from './processMatch'
import { Log } from 'web3-core'
import { saveState, STATE } from './state'
import sleep from '../utils/sleep'

export const CONFIRMATION_HASH = '0x23f45cb5875e7f29f713a73ded05ceba70bd3aa2435e5d1f69dc8d05f264d10c'
export const MATCH_HASH = '0x371a1bb45741f91941f086f6c1521091f71a73103cfc9b14f5c87ad51f759562'

export default async function syncGnosis(fromBlock: number, toBlock?: number): Promise<void> {
  const events: Log[] = []

  if (!toBlock) {
    toBlock = Number(await web3.eth.getBlockNumber())
  }

  for (let _fromBlock = fromBlock; _fromBlock < toBlock; _fromBlock += 1_000) {
    const _toBlock = _fromBlock + 999 > toBlock ? toBlock : _fromBlock + 999
    events.push(...await web3.eth.getPastLogs({
      fromBlock: _fromBlock,
      toBlock: _toBlock,
      address: config.contractAddressGnosis,
    }))
    console.log(`synced ${_fromBlock} -> ${_toBlock}`)
  }

  for (const event of events) {
    if (event.topics[0] === CONFIRMATION_HASH) {
      await processConfirmations(event)
    } else if (event.topics[0] === MATCH_HASH) {
      await processMatch(event)
    }
  }

  if (toBlock > fromBlock) {
    STATE.blockNumberGnosis = toBlock
    saveState()
    fromBlock = toBlock + 1
  }

  await sleep(10_000)
  return syncGnosis(fromBlock)
}