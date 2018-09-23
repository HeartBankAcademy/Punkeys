import React, {Component} from 'react'
import { uport } from './../../../util/connectors.js'

class AttestButton extends Component{
    attest(){
        uport.requestCredentials().then((credentials) => {
            // Can verify the uport user is verified with the returned 'credentials' object.
            uport.attestCredentials({
              sub: credentials.address,
              claim: {
                "MedicalRecords": {
                    "BloodType": this.props.bloodType,
                    "Alergies": this.props.alergies,
                    "Photo": this.props.ipfsURL
                }
              }
            })
        })
    }

    render(){
        return(
            <a href="#" className="pure-menu-link" onClick={() => this.attest()}>Attest</a>
          )
    }
}
export default AttestButton

