import React, { Component } from 'react'
// Images
import Background from '../../img/bg.jpg'
import Logo from '../../img/logo.png'

class Home extends Component {
  render() {
    const container = {
      boxSizing: 'border-box',
      width: '100%',
      padding: '45px 20px',
      minHeight: '100vh',
      backgroundImage: `url(${Background})`,
      backgroudSize: 'cover',
      textAlign: 'center'
    };
    const titulo = {
      fontFamily: 'OpenSans',
      fontWeight: '300',
      fontSize: '60px',
      color: '#FFFFFF',
      letterSpacing: '0',
      lineHeight: '80px',
    };
    const subtitulo = {
      fontFamily: 'OpenSans',
      fontWeight: '300',
      fontSize: '22px',
      color: '#FFFFFF',
      letterSpacing: '0',
      lineHeight: '22px',
    };
    return(
      <main style={container}>
        <div className="pure-g">
          <div className="pure-u-1-1 center">
            <img src={Logo} alt="" width="150px"/>
            <h1 style={titulo}>NEW<b>BORN</b></h1>
            <p style={subtitulo}>Tu registro médico digital, en todo momento y en cualquier lugar.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
