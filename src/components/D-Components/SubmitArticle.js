import React, { Component } from "react";
import { Table, Grid, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import contract from 'truffle-contract';

import web3 from "../../web3";
import { setJSON } from "../../util/IPFS.js";
import Loader from "./Loader";
// import storehash from '../../storehash';

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipfsHash: null,
      buffer: "",
      ethAddress: "",
      transactionHash: "",
      txReceipt: "",
      loading: false,
      myData: {
        url: "",
        title: "",
        description: "",
        image: null
      },
      reward: ""
    };
  }

  handleMyData = e => {
    if (e.key === "Enter") {
      console.log("do validate");
    }
    console.log(this.state.myData);
    const { name, value } = e.target;
    this.setState(prevState => ({
      myData: {
        ...prevState.myData,
        [name]: value
      }
    }));
  };

  handleMyDataReward = e => {
    this.setState({ reward: e.target.value });
  };

  captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState(prevState => ({
        myData: {
          ...prevState.myData,
          image: `data:image/jpeg;base64,${Buffer(reader.result).toString(
            "base64"
          )}`
        }
      }));
    };
  };

  onSubmit = async event => {
    event.preventDefault();

    const { url } = this.state.myData;
    this.setState({ loading: true });
    //obtain contract address from storehash.js
    // const ethAddress= await TriveDapp.options.address;
    // this.setState({ethAddress});

    const hash = await setJSON({ myData: this.state.myData });

    //save document to IPFS,return its hash#, and set hash# to state
    //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add

    this.setState({ ipfsHash: hash });
    console.log(hash);

    // call Ethereum contract method "createTask" and send info to etheruem contract
    //return the transaction hash from the ethereum contract
    //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
    this.props.trive.triveContract
      .createTask(this.state.ipfsHash, url, this.state.reward * 10 ** 18, {
        from: this.props.account,
        gas: 6654755
      })
      .then(result => {
        console.log(result.tx);
        this.setState({ transactionHash: result.tx, loading: false });
      })
      .catch(error => {
        // TODO: make an error screen if user didn't approve contract to send tokens
        this.setState({ loading: false });
        console.log(error);
      });
  }; //onSubmit

  render() {
    ///CHANCE added image to this.state.myData
    const { title, url, description, image } = this.state.myData;

    //CHANCE this is the image base64
    console.log("I'mm I workimg", image);

    return (
      <div>
        {this.state.loading && <Loader />}

        <Grid className="verify-container">
          <h3> Give Article information to verify and send to IPFS </h3>
          <img src={image} className="showImage" />
          <br />
          <Form onSubmit={this.onSubmit}>
            <br />
            <input
              type="url"
              value={url}
              name="url"
              placeholder="Please enter the URL in question"
              onChange={this.handleMyData}
              style={{ width: "70%", marginRight: "5px" }}
            />
            <br />
            <br />
            <input
              type="text"
              value={title}
              name="title"
              placeholder="Please enter the Title of this task"
              onChange={this.handleMyData}
              style={{ width: "70%", marginRight: "5px" }}
            />
            <br />

            <br />
            <div class="upload-btn-wrapper">
              <button class="upload">Upload an image</button>
              <input type="file" onChange={this.captureFile} />
            </div>
            <br />
            <br />
            <textarea
              type="textarea"
              value={description}
              name="description"
              placeholder="Please enter a detailed description"
              onChange={this.handleMyData}
              style={{
                width: "70%",
                minHeight: "6em",
                height: "auto",
                marginRight: "5px"
              }}
            />
            <br />
            <br />
            <input
              type="number"
              value={this.state.reward}
              onChange={this.handleMyDataReward}
              placeholder="Please enter the reward offered"
              style={{ width: "70%", marginRight: "5px" }}
            />
            <br />
            <br />
            <Button bsStyle="primary" type="submit">
              Send it
            </Button>
            <br />
          </Form>

          <hr />

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
              {/* <tr>
                <td>Ethereum Contract Address</td>
                <td>{this.state.ethAddress}</td>
              </tr> */}

              <tr>
                <td>Tx Hash # </td>
                <td>{this.state.transactionHash}</td>
              </tr>
            </tbody>
          </Table>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    curUserInfo: state.currentUserInfo.curUserInfo,
    account: state.trive.account,
    trive: state.trive.contracts
    //activeAccount: state.web3.activeAccount
  };
};

export default withRouter(connect(mapStateToProps)(Verify));
