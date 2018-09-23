import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import getWeb3 from './util/getWeb3'
import DirectoryContract from '../build/contracts/Directory.json'
// Images
import Logo from './img/logo.png'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      contract: null,
      account: null,
      isDoctor: false
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


        return directoryInstance.Doctors.call(accounts[0])
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        console.log(result)
        return this.setState({ isDoctor: result, contract: directoryInstance, account: accounts[0] })
      })
    })

  }


  render() {
    
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        {
          this.state.isDoctor ?
            <li className="pure-menu-item">
              <Link to="/attestation" className="pure-menu-link">Attestation</Link>
            </li>
          :
            null
        }
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">Profile</Link>
        </li>
        <LogoutButtonContainer />
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <LoginButtonContainer />
        <li className="pure-menu-item">
          <Link to="/addDoctor" className="pure-menu-link">Add Doctor</Link>
        </li>
      </span>
    )

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal background-gradient" >
          <Link to="/" className="pure-menu-heading"><img src={Logo} alt="" width="20px"/></Link>
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
