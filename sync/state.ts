import fs from 'fs'
import web3 from '../provider/gnosis'

export let STATE: { blockNumberGnosis: number } = { blockNumberGnosis: 0 }

const filePath = './state.json'

export async function loadState() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(STATE))
    STATE.blockNumberGnosis = Number(await web3.eth.getBlockNumber())
  } else {
    STATE = JSON.parse(fs.readFileSync(filePath, { encoding:'utf8', flag:'r' }))
  }
}

export function saveState() {
  fs.writeFileSync(filePath, JSON.stringify(STATE))
}