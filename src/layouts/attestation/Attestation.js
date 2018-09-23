import React, { Component } from 'react'
import AttestButton from '../../user/ui/attestButton/AttestButton'
import ipfs from '../../ipfs';
import Logo from '../../img/logo_color.png'

class Attestation extends Component {
  state = {
      gender: "",
      weight: "",
      height: "",
      bloodType: "",
      hearthRate: "",
      bloodPressure: "",
      alergies: "",
      surgeries: "",
      bloodTransfusions: "",
      currentDeseases: "",
      currentMedications: "",
      ipfsURL:null,
      buffer:'',
  }

  //Take file input from user
  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };
  //Convert the file to buffer to store on IPFS
  convertToBuffer = async(reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer-using es6 syntax
    this.setState({buffer});
  };

  onSubmit = async (event) => {
    event.preventDefault();
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err,ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ 
        ipfsURL: "https://gateway.ipfs.io/ipfs/"+ipfsHash[0].hash  
      });
      console.log(this.state.ipfsURL)
    })
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

    };
    const titulo = {
      fontFamily: 'Roboto',
      fontSize: '24px',
      color: '#0F0F0F',
      letterSpacing: '0',
      fontWeight: 'bold',
      marginBottom: '30px'
    }
    const label = {
      float: 'left',
      fontSize: '16px',
      color: '#000000',
      letterSpacing: '0',
      lineHeight: '21px',
    }
    const input = {
      float: 'right',
      background: '#FFFFFF',
      border: '1px solid #CCCCCC',
      borderRadius: '4px',
      width: '300px',

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
    const divRaro = {
      display: 'inline-block',
      marginTop: '50px',
      marginBottom: '50px'
    };

    return(
      <main style={container}>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <img src={Logo} alt="" style={logo}/>
            <div style={profileContainer}>
              <form>
                <h1 style={titulo}>Historial Médico</h1>
                
                <div style={div}>
                  
                  <label style={label} htmlFor="gender">Género</label>
                  <input style={input} type="text" name="gender" onChange={(e) => this.handleChange(e)} />
                </div>
                <br/>
                <div style={div}>
                  
                  <label style={label} htmlFor="weight">Peso</label>
                  <input style={input} type="text" name="weight" onChange={(e) => this.handleChange(e)} />
                </div>
                <br/>
                <div style={div}>
                  
                  <label style={label} htmlFor="height">Altura</label>
                  <input style={input} type="text" name="height" onChange={(e) => this.handleChange(e)} />
                </div>
                <br/>
                <div style={div}>
                  
                  <label style={label} htmlFor="bloodType">Tipo de Sangre</label>
                  <input style={input} type="text" name="bloodType" onChange={(e) => this.handleChange(e)} />
                </div>
<br/>
                <div style={div}>
  
                  <label style={label} htmlFor="hearthRate">Frecuencia Cardiaca</label>
                  <input style={input} type="text" name="hearthRate" onChange={(e) => this.handleChange(e)} />
                </div>
<br/>
                <div style={div}>
  
                  <label style={label} htmlFor="bloodPressure">Presión Arterial</label>
                  <input style={input} type="text" name="bloodPressure" onChange={(e) => this.handleChange(e)} />
                </div>
<br/>
                <div style={div}>
                  
                  <label style={label} htmlFor="alergies">Alergias</label>
                  <input style={input} type="text" name="alergies" onChange={(e) => this.handleChange(e)} />
                </div>
<br/>
                <div style={div}>
                  
                  <label style={label} htmlFor="surgeries">Cirugías</label>
                  <input style={input} type="text" name="surgeries" onChange={(e) => this.handleChange(e)} />
                </div>
<br/>
                <div style={div}>
                  
                  <label style={label} htmlFor="bloodTransfusions">Transfusiones</label>
                  <input style={input} type="text" name="bloodTransfusions" onChange={(e) => this.handleChange(e)} />
                </div>
<br/>
                <div style={div}>
                  
                  <label style={label} htmlFor="currentDeseases">Enfermedades Actuales</label>
                  <input style={input} type="text" name="currentDeseases" onChange={(e) => this.handleChange(e)} />
                </div>
<br/>
                <div style={div}>
                  
                  <label style={label} htmlFor="currentMedications">Medicación Actual</label>
                  <input style={input} type="text" name="currentMedications" onChange={(e) => this.handleChange(e)} />
                </div>
<br/>
                <hr style={hr}/>
                <h1 style={titulo}>Documento Médico</h1>
                <div style={div}>
                  <input type="file" onChange={(e) => this.captureFile(e)} />
                  <button onClick={(e) => this.onSubmit(e)}>Upload</button>
                </div>
                <div style={divRaro}>
                  <AttestButton {...this.state} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Attestation
