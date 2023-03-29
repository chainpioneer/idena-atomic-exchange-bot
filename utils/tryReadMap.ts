import * as idenaProvider from '../provider/idena'

export default async function tryReadMap(contractAddress: string, method: string, key: string, type: string) {
  try {
    return await idenaProvider.readMap(contractAddress, method, key, type)
  } catch (e) {
    return null
  }
}