import web3 from '../provider/gnosis'
import processConfirmation from '../sync/processConfirmation'
import { COMPLETE_HASH, CONFIRMATION_HASH, MATCH_HASH } from '../sync/syncGnosis'
import { Log } from 'web3-core'
import processMatch from '../sync/processMatch'
import processCompletion from '../sync/processCompletion'

async function run() {

  const txReceipt = await web3.eth.getTransactionReceipt('0x81085d21412a04a73e046073eb066aeb672b61e8825f34f9883079c26924588f')
  await processConfirmation(txReceipt.logs.find(x => x.topics[0] === CONFIRMATION_HASH) as Log)

  const txReceipt2 = await web3.eth.getTransactionReceipt('0x9dbfa1598930afc7fce081ac2e3d6fec56ff2caa44773bc2e0de58c392b85831')
  await processCompletion(txReceipt2.logs.find(x => x.topics[0] === COMPLETE_HASH) as Log)

  // const txReceipt3 = await web3.eth.getTransactionReceipt('0x20cb10a59ced23f8908f00dc00e53201dac2480a6872c7636f65347d5e071b23')
  // await processMatch(txReceipt3.logs.find(x => x.topics[0] === MATCH_HASH) as Log)
}

run()