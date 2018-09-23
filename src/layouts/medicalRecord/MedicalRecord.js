import React, { Component } from 'react'
import * as emailjs from 'emailjs-com'
import { uport } from '../../util/connectors.js'
import Logo from '../../img/logo_color.png'

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
    const container = {
      boxSizing: 'border-box',
      width: '100%',
      padding: '45px 20px',
      textAlign: 'center'
    }
    const logo = {
      width: '86px',
      marginTop: '32px',
      marginBottom: '32px',
    }
    const profileContainer = {
      width: '600px',
      margin: '0 auto',
      boxShadow: '0 0 3px 2px rgba(0,0,0,0.15)',
      borderRadius: '5.5px',
      paddingTop: '24px',
      paddingLeft: '162px',
      paddingRight: '162px',
      paddingBottom: '60px'

    };
    const titulo = {
      fontFamily: 'Roboto',
      fontSize: '24px',
      color: '#0F0F0F',
      letterSpacing: '0',
      fontWeight: 'bold',
      marginBottom: '30px'
    }
    const p = {
      float: 'left',
      fontSize: '16px',
      color: '#000000',
      letterSpacing: '0',
      lineHeight: '21px',
      textAlign: 'left',
      width: '300px',
      fontWeight: '600'
    }
    const data = {
      float: 'left',
      fontSize: '16px',
      color: '#000000',
      letterSpacing: '0',
      lineHeight: '21px',
    }
    const hr = {
      width: '100%',
      marginTop: '48px',
      marginBottom: '54px'
    };
    const div = {
      display: 'inline-block',
      width: '540px'
    };
    const img = {
      marginBottom: '60px',
      width: '600px'
    };
    const input = {
      background: '#E5E9ED',
      border: '0 solid rgba(208,208,208,0.50)',
      borderRadius: '2.2px',
      height: '32px',
      paddingLeft: '15px',
      marginRight: '15px',
      width: '400px'
    };
    const button = {
        background: '#6CB7FC',
        borderRadius: '26.91px',
        textDecoration: 'none',
        color: 'white',
        padding: '10px 26px',
    }
    return(
      <main style={container}>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <img src={Logo} alt="" style={logo}/>
            <div style={profileContainer}>
              <form>
                <h1 style={titulo}>Historial Médico</h1>
                
                <div style={div}>
                  
                  <p style={p} htmlFor="gender">Género</p>
                  <p style={data}>{this.props.authData.MedicalRecords.Gender}</p>
                       </div>
                <br/>
                <div style={div}>
                  
                  <p style={p} htmlFor="weight">Peso</p>
                  <p style={data}>{this.props.authData.MedicalRecords.Weight}</p>
                       </div>
                <br/>
                <div style={div}>
                  
                  <p style={p} htmlFor="height">Altura</p>
                  <p style={data}>{this.props.authData.MedicalRecords.Height}</p>
                       </div>
                <br/>
                <div style={div}>
                  
                  <p style={p} htmlFor="bloodType">Tipo de Sangre</p>
                  <p style={data}>{this.props.authData.MedicalRecords.BloodType}</p>
                          </div>
<br/>
                <div style={div}>
  
                  <p style={p} htmlFor="hearthRate">Frecuencia Cardiaca</p>
                  <p style={data}>{this.props.authData.MedicalRecords.HearthRate}</p>
                           </div>
<br/>
                <div style={div}>
  
                  <p style={p} htmlFor="bloodPressure">Presión Arterial</p>
                  <p style={data}>{this.props.authData.MedicalRecords.BloodPressure}</p>
                              </div>
<br/>
                <div style={div}>
                  
                  <p style={p} htmlFor="alergies">Alergias</p>
                  <p style={data}>{this.props.authData.MedicalRecords.Alergies}</p>
                         </div>
<br/>
                <div style={div}>
                  
                  <p style={p} htmlFor="surgeries">Cirugías</p>
                  <p style={data}>{this.props.authData.MedicalRecords.Surgeries}</p>
                          </div>
<br/>
                <div style={div}>
                  
                  <p style={p} htmlFor="bloodTransfusions">Transfusiones</p>
                  <p style={data}>{this.props.authData.MedicalRecords.BloodTransfusions}</p>
                                  </div>
                <br/>
                <div style={div}>
                  
                  <p style={p} htmlFor="currentDeseases">Enfermedades Actuales</p>
                  <p style={data}>{this.props.authData.MedicalRecords.CurrentDeseases}</p>
                                </div>
                <br/>
                <div style={div}>
                  
                  <p style={p} htmlFor="currentMedications">Medicación Actual</p>
                  <p style={data}>{this.props.authData.MedicalRecords.CurrentMedications}</p>

                </div>
                <br/>
                <hr style={hr}/>
                <h1 style={titulo}>Documento Médico</h1>
                <img style={img} src={this.props.authData.MedicalRecords.Photo} alt="" />
                <input style={input} type="email" name="email" placeholder="Email" onChange={(e) => this.handleChange(e)} />
                <button style={button} onClick={(e) => this.onSubmit(e)}>Enviar</button>
              </form>
            </div>
            
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
