import web3 from '../provider/gnosis'

export function formatAddress(addr: string): string {
  if (addr.length === 66) {
    return web3.utils.toChecksumAddress(`0x${addr.substring(26)}`)
  }
  return web3.utils.toChecksumAddress(addr)
}