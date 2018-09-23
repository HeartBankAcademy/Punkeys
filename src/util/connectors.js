import { Connect, SimpleSigner } from 'uport-connect'

//export let uport = new Connect('TruffleBox')

export let uport = new Connect('NewBorn', {
      clientId: '2os1hGZywZJdTr5xf8A8vX7eeuznarrKYbE',
      network: 'rinkeby',
      signer: SimpleSigner('d2f187d0e68b937f69c7c554d5658e2cb26ef90d4e21ff025a63fe3205a4fa0b')
    })

export const web3 = uport.getWeb3()
