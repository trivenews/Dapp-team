import React, { Component } from "react";
import {
  withRouter
} from "react-router-dom";
import {
  Grid,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  FormControl,
  Table
} from "react-bootstrap";
// import contract from "truffle-contract";
// import web3 from "../web3";
import {
  storeWeb3Account,
  instantiateTriveContract,
  currentUserInformation
} from "../actions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// import ShowArticleInfo from "./showComponents/showArticleInfo";
// import VotingContract from '../../build/contracts/Voting.json';
//
// const TriveDapp = contract(VotingContract);
// TriveDapp.setProvider(web3.currentProvider);
// TODO: testing if I can give these vars as props
// TODO: button will call function on contract artifacts

// const TriveDapp = contract(VotingContract);
// TriveDapp.setProvider(web3.currentProvider);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      articleIds: [],
      articles: [],
      triveBalance: "",
      setAllowAmount: "",
      AllowAmount: 0
    };
    // this.getTaskByOwner = this.getTaskByOwner.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkBalance = this.checkBalance.bind(this);
    this.handleSubmitAllow = this.handleSubmitAllow.bind(this);
    this.handleChangeAllow = this.handleChangeAllow.bind(this);
    // this.getTaskInfo = this.getTaskInfo.bind(this);
    // this.becomeResearcher = this.becomeResearcher.bind(this);
  }
  handleChange(e) {
    console.log(e.target.value)
    this.setState({ username: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.trive.triveContract.methods
      .createUser(this.state.username)
      .send({ from: this.props.account })
      .then(result => {
        console.log(result)
        // this.props.currentUserInformation();
      })
      .catch(err => {
        console.log(err);
      })
  }
  // findArticleInfo(arr) {
  //   console.log(arr);
  //   let res = [];
  //   arr.map(num => {
  //     res.push(parseInt(num.toString()))
  //   });
  //   console.log(res);
  //   this.setState({
  //     articleIds: res
  //   });
  //
  //   res.forEach((num) => {
  //     this.getTaskInfo(num);
  //   });
  // }

  // getTaskInfo(articleId) {
  //   this.props.triveDappInstance._getTaskInfo(articleId)
  //   .then((result) => {
  //     console.log(result)
  //     var articles = [...this.state.articles];
  //     articles.push(<ShowArticleInfo key={articleId} data={result} curAddr={this.props.curUserInfo.address}/>);
  //
  //     this.setState({
  //       articles
  //     });
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  // getTaskByOwner() {
  //   this.props.triveDappInstance._getTasksByOwner(this.props.noUserAddr || this.props.curUserInfo.address)
  //   .then((result) => {
  //     this.findArticleInfo(result);
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  //become researcher function
  becomeResearcher = e => {
    e.preventDefault();
    this.props.trive.triveContract.methods
      .createResearcher()
      .send({ from: this.props.account })
      .then(result => {
        console.log(result);
        this.props.currentUserInformation();
      })
      .catch(error => {
        console.log(error);
      });
  };


  becomeVerifier = e => {
    e.preventDefault();
    this.props.trive.triveContract.methods
      .createVerifier()
      .send({ from: this.props.account })
      .then(result => {
        console.log(result);
        this.props.currentUserInformation();
      })
      .catch(error => {
        console.log(error);
      });
  };

  checkBalance() {
    this.props.trive.coinContract.methods
      .balanceOf(this.props.account)
      .call({ from: this.props.account})
      .then(result => {
        this.setState({ triveBalance: result / 10 ** 8 });
      })
      .catch(error => {
        console.log(error);
      });

    this.props.trive.coinContract.methods
      .allowance(this.props.account, this.props.trive.triveContract.address)
      .call({
        from: this.props.account,
        gas: 6654755
      })
      .then(result => {
        this.setState({ AllowAmount: result / 10 ** 8 });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChangeAllow(e) {
    this.setState({ setAllowAmount: e.target.value });
  }
  handleSubmitAllow(e) {
    e.preventDefault();

    this.props.trive.coinContract.methods
      .approve(
        this.props.trive.triveContract.address,
        this.state.setAllowAmount * 10 ** 8
      )
      .send({ from: this.props.account, gas: 6654755 })
      .then(res => {
        this.checkBalance();
      })
      .catch(error => {
        console.log(error);
      });
  }
  //// TODO: add coma when displaying trive balance (8 decimals)

  componentDidMount() {
    // this.getTaskByOwner()
    if (this.props.trive.isloaded) {
      this.checkBalance();
    }
  }

  render() {
    const gridHeight = {
      "min-height": "100vh",
      heigt: "auto",
      "min-width": "100%"
    };

    const {
      isUser,
      name,
      address,
      reputation,
      rank,
      readyTime
    } = this.props.curUserInfo;
    const {
      username,
      articles,
      articleIds,
      AllowAmount,
      setAllowAmount
    } = this.state;
    const checkForResearcher = (
      <Button bsStyle="warning" onClick={this.becomeResearcher}>
        Become A Researcher!
      </Button>
    );
    const checkForVerifier = (
      <Button bsStyle="warning" onClick={this.becomeVerifier}>
        Become A Verifier!
      </Button>
    );

    const registerForm = (
      <Form inline>
        <FormGroup controlId="formInlineName">
          {" "}
          <br />
          <h1 className="text-center">Welcome to trive.news</h1>
          <h3 className="text-center">
            Current ethereum addres: {this.props.account}
          </h3>
          <h3 className="text-center">
            Please enter a username to get started
          </h3>
          <FormControl
            type="text"
            value={username}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
        </FormGroup>
        <br />
        <br />
        <Button bsStyle="primary" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );

    const userInfo = (
      <div>
        <h1>{name}</h1>
        {this.props.curUserInfo.rank < 2 && checkForResearcher}{" "}
        {this.props.curUserInfo.rank < 3 && checkForVerifier}
        <Table bordered responsive>
          <tbody>
            <tr>
              <th>My address</th>
              <th>{address}</th>
            </tr>
            <tr>
              <td>Reputation</td>
              <td>{reputation}</td>
            </tr>
            <tr>
              <td>Rank</td>
              <td>{rank}</td>
            </tr>
            <tr>
              <td>TRV Balance</td>
              <td>{this.state.triveBalance}</td>
            </tr>
            <tr>
              <td>Allowence Balance</td>
              <td>{AllowAmount}</td>
            </tr>
            <tr>
              <td>Ready time</td>
              <td>{new Date(readyTime * 1000).toString()}</td>
            </tr>
          </tbody>
        </Table>
        <Form inline>
          <FormGroup controlId="formInlineName">
            <br />
            <h3 className="text-center">Allow the contract to send trive</h3>
            <FormControl
              type="number"
              value={setAllowAmount}
              placeholder="Enter amount"
              onChange={this.handleChangeAllow}
            />
          </FormGroup>
          <br />
          <br />
          <Button bsStyle="success" onClick={this.handleSubmitAllow}>
            Allow
          </Button>
        </Form>
      </div>
    );

    return (
      <div>
        <div className="dashboard-div">
          <img
            src="https://trive.news/wp-content/uploads/2018/03/trive-logo-icon.png"
            className="App-logo-d"
            alt="logo"
          />
        </div>
        <div>
          <Grid style={gridHeight}>
            <Row className="show-grid">
              <Col md={2} />
              <Col md={8} className="text-center">
                {!isUser && registerForm}
                {isUser && userInfo}
              </Col>
              <Col md={2} />
            </Row>
            <Row className="show-grid">
              <Col md={12} className="text-center">
                {articles}
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // instantiateTriveContract,
      // storeWeb3Account,
      currentUserInformation
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    curUserInfo: state.currentUserInfo.curUserInfo,
    account: state.trive.account,
    trive: state.trive.contracts
    //activeAccount: state.web3.activeAccount
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
// export default Register;
