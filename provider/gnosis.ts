import Web3 from 'web3'
import config from '../constants/config'

const web3 = new Web3(config.rpcUrlGnosis)

export default web3