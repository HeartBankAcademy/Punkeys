import { Connect, SimpleSigner } from 'uport-connect'

//export let uport = new Connect('TruffleBox')

export let uport = new Connect('Ani Toledo\'s new app', {
      clientId: '2oswGdFuYkph7pXmLJFmuX7rB3WjMtMEfcK',
      network: 'rinkeby',
      signer: SimpleSigner('d73bb8bccff14dc5ed1916c7354efdae22caba9d94e4c7cc63b8306c5b630328')
    })

export const web3 = uport.getWeb3()
