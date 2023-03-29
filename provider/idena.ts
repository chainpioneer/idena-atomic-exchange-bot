import {IdenaProvider} from "idena-sdk-js"
import config from '../constants/config'

const idenaProvider = IdenaProvider.create(config.rpcUrlIdena, config.rpcUrlApiKeyIdena)

export async function estimateCall(contract: string, from: string, method: string, amount: string, maxFee: string, args = null) {
  return await idenaProvider.doRequest({
    method: 'contract_estimateCall',
    params: [
      {
        from,
        contract: contract,
        method: method,
        amount: amount,
        maxFee: maxFee,
        args: args,
      },
    ],
  });
}

export async function readData(contract: string, key: string, format: string) {
  return await idenaProvider.doRequest({
    method: 'contract_readData',
    params: [contract, key, format],
  });
}

export async function readMap(contract: string, map: string, key: string, format: string) {
  return await idenaProvider.doRequest({
    method: 'contract_readMap',
    params: [contract, map, key, format],
  });
}

export async function getBlockNumber() {
  const result = await idenaProvider.Blockchain.lastBlock()
  return result.height
}

export function getLastBlock() {
  return idenaProvider.Blockchain.lastBlock()
}

export function getBlock(num: number) {
  return idenaProvider.Blockchain.blockAt(num)
}