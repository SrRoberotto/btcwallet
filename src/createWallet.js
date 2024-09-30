// const {BIP32Factory} = require('bip32')
// const ecc = require('tiny-secp256k1')
// const bip32 = BIP32Factory(ecc)

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
// Define network parameters for Testnet4
// const testnet4 = {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'tb',
//     bip32: {
//         public: 0x043587cf,  // Base58 prefix for xpub on Testnet4
//         private: 0x04358394  // Base58 prefix for xprv on Testnet4
//         },
//         pubKeyHash: 0x6f,      // P2PKH starts with 'm' or 'n'
//         scriptHash: 0xc4,      // P2SH starts with '2'
//         wif: 0xef              // Wallet Import Format prefix
//     };
//bitcoin = mainnet btc
//testnet = testnet btc
const network = bitcoin.networks.testnet
// const network = testnet4; //



//derivação de carteiras HD
//const path = `m/49'/0'/0'/0` //mainnet
const path = "m/44'/1'/0'/0" //testnet



let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)
let root = bip32.fromSeed(seed,network)

//criando uma conta pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network:network,
}).address

console.log ("Carteira gerada")
// console.log ("Network:", network)
// console.log ("Network 4:", bitcoin.networks)
console.log ("Endereço: ", btcAddress)
// console.log ("Endereço 2: ", bech32Address)
console.log ("Chave privada: ", node.toWIF())
console.log ("Seed: ", mnemonic)
console.log (`Explorador: https://www.blockchain.com/explorer/search?search=${btcAddress}`)


