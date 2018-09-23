import React, { Component } from 'react'
import DirectoryContract from '../../../build/contracts/Directory.json'
import getWeb3 from '../../util/getWeb3'
import Logo from '../../img/logo_color.png'

class Attestation extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      contract: null,
      account: null,
      doctorAddress: ""
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const directory = contract(DirectoryContract)
    directory.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var directoryInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      directory.deployed().then((instance) => {
        directoryInstance = instance


        return this.setState({ contract: directoryInstance, account: accounts[0] })
      })
    })
  }

  addDoctor = (e) => {
    event.preventDefault();

    const contract = this.state.contract
    const account = this.state.account

    contract.addDoctor(this.state.doctorAddress, {from:account});
    
  };

  removeDoctor = (e) => {
    event.preventDefault();
    
    const contract = this.state.contract
    const account = this.state.account

    contract.removeDoctor(this.state.doctorAddress, {from:account});
  };

  handleChange = (e) => {
   this.setState({
      [e.target.name]: e.target.value
    })
  } 

  render() {
    const container = {
      boxSizing: 'border-box',
      width: '100%',
      padding: '45px 20px',
      textAlign: 'center'
    }
    const profileContainer = {
      height: '268px',
      width: '693px',
      margin: '0 auto',
      boxShadow: '0 0 3px 2px rgba(0,0,0,0.15)',
      borderRadius: '5.5px',
      paddingTop: '72px',
      paddingLeft: '88px',
      paddingRight: '88px',
    };
    const logo = {
      width: '86px',
      marginTop: '32px',
      marginBottom: '32px',
    }
    const inputEmail = {
      width: '100%',
      border: '1px solid #CCCCCC',
      borderRadius: '4px',
      height: '38px',
      paddingLeft: '15px',
    }
    const button = {
      background: '#7CB3FC',
      borderRadius: '100px',
      border: 'none',
      color: 'white',
      fontWeight: '600',
      padding: '20px 40px',
      marginTop: '62px',
      marginRight: '30px',
    }
    return(
      <main style={container}>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <img src={Logo} alt="" style={logo}/>
            <div style={profileContainer}>
              <input style={inputEmail} type="text" name="doctorAddress" placeholder="Doctor" onChange={(e) => this.handleChange(e)} />
              <button style={button} onClick={(e) => this.addDoctor(e)}>Agregar Doctor</button>
              <button style={button} onClick={(e) => this.removeDoctor(e)}>Eliminar Doctor</button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Attestation
