const dotenv = require('dotenv')
const ethers = require('ethers')
const { ContractFactory } = require('ethers')
const {
  bytecode,
  abi
} = require('./artifacts/contracts/Lottery.sol/Lottery.json')

dotenv.config()

const deploy = async () => {
  const provider = await new ethers.JsonRpcProvider(
    'https://sepolia.infura.io/v3/' + process.env.INFURA_KEY
  )
  console.log('provider ready, getting the account ...')

  const account = await ethers.Wallet.fromPhrase(
    process.env.MNEMONIC,
    provider
  ).connect(provider)
  console.log('account ready, creating factory ...')

  const factory = await new ContractFactory(abi, bytecode, account)
  const balance = await provider.getBalance(account.address)

  console.log('account balance', ethers.formatEther(balance))

  console.log('factory ready, deploying ...')

  const contract = await factory.deploy()

  console.log('contract deployed', contract.target)
}

deploy()
