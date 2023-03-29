import config from '../constants/config'
import tryReadMap from './tryReadMap'
import { formatAddress } from './formatAddress'

export default async function getOrderState(secretHash: string) {
  let [
    owner,
    payoutAddress,
    amountDNA,
    amountXDAI,
    expirationBlock,
    matcher,
    matchExpirationBlock,
  ] = await Promise.all([
    tryReadMap(config.contractAddressIdena, 'getOwner', secretHash, 'address'),
    tryReadMap(config.contractAddressIdena, 'getPayoutAddresses', secretHash,  'address'),
    tryReadMap(config.contractAddressIdena, 'getAmountDNA', secretHash,  'hex'),
    tryReadMap(config.contractAddressIdena, 'getAmountXDAI', secretHash,  'hex'),
    tryReadMap(config.contractAddressIdena, 'getExpirationBlock', secretHash, 'uint64'),
    tryReadMap(config.contractAddressIdena, 'getMatcher',secretHash,  'address'),
    tryReadMap(config.contractAddressIdena, 'getMatchExpirationBlock',secretHash,  'uint64'),
  ])

  if (owner) {
    owner = formatAddress(owner)
  }

  if (payoutAddress) {
    payoutAddress = formatAddress(payoutAddress)
  }

  if (amountXDAI) {
    amountXDAI = BigInt(amountXDAI)
  }

  if (amountDNA) {
    amountDNA = BigInt(amountDNA)
  }


  return {
    owner,
    payoutAddress,
    amountDNA,
    amountXDAI,
    expirationBlock,
    matcher,
    matchExpirationBlock,
  }
}