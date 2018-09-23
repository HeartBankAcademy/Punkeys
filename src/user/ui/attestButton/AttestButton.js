import React, {Component} from 'react'
import { uport } from './../../../util/connectors.js'
import DirectoryContract from '../../../../build/contracts/Directory.json'
import getWeb3 from '../../../util/getWeb3'

class AttestButton extends Component{

    attest(){
        
        uport.requestCredentials().then((credentials) => {
            // Can verify the uport user is verified with the returned 'credentials' object.
            uport.attestCredentials({
              sub: credentials.address,
              claim: {
                "MedicalRecords": {
                    "Gender": this.props.gender,
                    "Weight": this.props.weight,
                    "Height": this.props.height,
                    "BloodType": this.props.bloodType,
                    "HearthRate": this.props.hearthRate,
                    "BloodPressure": this.props.bloodPressure,
                    "Alergies": this.props.alergies,
                    "Surgeries": this.props.surgeries,
                    "BloodTransfusions": this.props.bloodTransfusions,
                    "CurrentDeseases": this.props.currentDeseases,
                    "CurrentMedications": this.props.currentMedications,
                    "Photo": this.props.ipfsURL
                }
              }
            })
        })
    }

    render(){
        const button = {
            background: '#6CB7FC',
            borderRadius: '26.91px',
            textDecoration: 'none',
            color: 'white',
            padding: '10px 26px',
        }
        return(
            <a href="#" style={button} onClick={() => this.attest()}>Guardar</a>
          )
    }
}
export default AttestButton

