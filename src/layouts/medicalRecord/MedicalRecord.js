import React, { Component } from 'react'
import * as emailjs from 'emailjs-com'
import { uport } from '../../util/connectors.js'

class Profile extends Component {
  state = {
    email: ''
  }

  handleChange = (e) => {
   this.setState({
      [e.target.name]: e.target.value
    })
  } 

  onSubmit = (event) => {
    event.preventDefault()
    var templateParams = {
        name: this.props.authData.name,
        bloodType: this.props.authData.MedicalRecords.BloodType,
        alergies: this.props.authData.MedicalRecords.Alergies,
        photo: this.props.authData.MedicalRecords.Photo,
    };

    uport.requestCredentials({
      requested: ['MedicalRecords'],
      notifications: true // We want this if we want to recieve credentials
    }).then((credentials) => {

      emailjs.send('gmail', 'template_FxriyiyT', templateParams, 'user_QYAJM1fLazi5JgSbyyeBo')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });
      
    })
     
  };

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            {console.log(this.props)}
            <p>{this.props.authData.MedicalRecords.BloodType}</p>
            <p>{this.props.authData.MedicalRecords.Alergies}</p>
            <input type="email" name="email" placeholder="Email" onChange={(e) => this.handleChange(e)} />
            <button onClick={(e) => this.onSubmit(e)}>Send</button>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
