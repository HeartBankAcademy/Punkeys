import React, { Component } from 'react'
import DirectoryContract from '../../../build/contracts/Directory.json'
import getWeb3 from '../../util/getWeb3'

class Attestation extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      contract: null,
      account: null,
      addDoctorAddress: "",
      removeDoctorAddress: ""
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

    contract.addDoctor(this.state.addDoctorAddress, {from:account});
    
  };

  removeDoctor = (e) => {
    event.preventDefault();
    
    const contract = this.state.contract
    const account = this.state.account

    contract.removeDoctor(this.state.removeDoctorAddress, {from:account});
  };

  handleChange = (e) => {
   this.setState({
      [e.target.name]: e.target.value
    })
  } 

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <input type="text" name="addDoctorAddress" onChange={(e) => this.handleChange(e)} />
            <button onClick={(e) => this.addDoctor(e)}>Add Doctor</button>
            <input type="text" name="removeDoctorAddress" onChange={(e) => this.handleChange(e)} />
            <button onClick={(e) => this.removeDoctor(e)}>Remove Doctor</button>
          </div>
        </div>
      </main>
    )
  }
}

export default Attestation
