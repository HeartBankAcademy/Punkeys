import React, { Component } from 'react'
import AttestButton from '../../user/ui/attestButton/AttestButton'
import ipfs from '../../ipfs';

class Attestation extends Component {
  state = {
      name: "",
      bloodType: "",
      alergies: "",
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
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <form>
              <input type="text" name="name" placeholder="Name" onChange={(e) => this.handleChange(e)} />
              <input type="text" name="bloodType" placeholder="Blood Type" onChange={(e) => this.handleChange(e)} />
              <input type="text" name="alergies" placeholder="Alergies" onChange={(e) => this.handleChange(e)} />
              <input type="file" onChange={(e) => this.captureFile(e)} />
              <button onClick={(e) => this.onSubmit(e)}>Upload</button>
              <AttestButton {...this.state} />
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default Attestation
