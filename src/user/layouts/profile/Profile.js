import React, { Component } from 'react'
import { Link } from 'react-router'
// Images
import Logo from '../../../img/logo_color.png'

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
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
      height: '348px',
      width: '600px',
      margin: '0 auto',
      boxShadow: '0 0 3px 2px rgba(0,0,0,0.15)',
      borderRadius: '5.5px',
      paddingTop: '24px',
      paddingLeft: '40px',
      paddingRight: '40px',
    };
    const profilePicture = {
      display: 'inherit',
      borderRadius: '108px',
      height: '140px',
      width: '140px',
      objectFit: 'cover',
      float: 'left'
    };
    const data = {
      fontFamily: 'OpenSans',
      fontSize: '22px',
      color: '#4A4A4A',
      letterSpacing: '0',
    };
    const hr = {
      width: '100%',
      marginTop: '48px',
      marginBottom: '54px'
    };
    const medicalRecord = {
      textDecoration: 'none',
      border: '1px solid #7CB3FC',
      borderRadius: '100px',
      color: '#7CB3FC',
      fontSize: '14px',
      padding: '15px 30px',
    };
    return(
      <main style={container}>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <img src={Logo} alt="" style={logo}/>
            <div style={profileContainer}>
              <img src={this.props.authData.avatar.uri} alt="" style={profilePicture}/>
              <p style={data}><b>{this.props.authData.name}</b></p>
              <p style={data}>{this.props.authData.phone}</p>
              <p style={data}>{this.props.authData.country}</p>
              <hr style={hr}/>
              <Link style={medicalRecord} to='/medicalRecord'>HISTORIAL MEDICO</Link>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
