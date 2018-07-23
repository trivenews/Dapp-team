import {Table, Grid, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import web3 from '../../web3';
import { setJSON, getJSON } from '../../util/IPFS.js'
import storehash from '../../storehash';

class Verify extends Component {
    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      transactionHash:'',
      txReceipt: '',
      myData: ''
    };

   //handle capture file event if we want to add a file upload to the page

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
      };

      handleMyData = (e) => {
        this.setState({ myData: e.target.value });
    }


    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };



    onSubmit = async (event) => {
      event.preventDefault();
      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();

      console.log('Sending from Metamask account: ' + accounts[0]);
      //obtain contract address from storehash.js
      const ethAddress= await storehash.options.address;
      this.setState({ethAddress});

      const hash = await setJSON({ myData: this.state.myData });
      console.log('this is my hash', hash);

      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add

        this.setState({ ipfsHash: hash });

        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
        //return the transaction hash from the ethereum contract
        //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

        storehash.methods.sendHash(this.state.ipfsHash).send({
          from: accounts[0]
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        }); //storehash

    }; //onSubmit

    render() {

      return (
        <div >


        <Grid className="verify-container">
          <h3> Choose URL to verify and send to IPFS </h3>
          <br />
          <Form onSubmit={this.onSubmit} >

            <input
              type = "url"
              value={this.state.myData}
              onChange={this.handleMyData}
              style={{width: '70%', height: '3em', marginRight: '5px'}}
               />

             <Button
             bsStyle="primary"
             type="submit">
             Send it
             </Button>
          </Form>

          <hr/>

              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Tx Receipt Category</th>
                    <th>Values</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>IPFS Hash # stored on Eth Contract</td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr>

                  <tr>
                    <td>Tx Hash # </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>
                </tbody>
            </Table>
        </Grid>
     </div>
      );
    } //render
}

export default Verify;
