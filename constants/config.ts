import loadEnv from './loadEnv'

const config = {
  rpcUrlIdena: loadEnv('RPC_URL_IDENA', true) as string,
  rpcUrlApiKeyIdena: loadEnv('IDENA_API_KEY', true) as string,
  rpcUrlGnosis: loadEnv('RPC_URL_GNOSIS', true) as string,
  explorerUrlIdena: 'https://scan.idena.io',
  explorerUrlGnosis: 'https://gnosisscan.io',
  contractAddressGnosis: '0x426b466Af327E53B4c2a7D1Ea7672E397BE7b408',
  contractAddressIdena: '0xE23369534EfBfbc1E51f028DAe5f412CCCe1ccA9',
  appBaseUrl: 'https://idexchange.tech',
}

export default config
