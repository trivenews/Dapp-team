import React, { Component } from "react";
import {Jumbotron, Media, Button} from "react-bootstrap";
// import contract from 'truffle-contract';
// import web3 from '../../web3';
import { withRouter, Link } from 'react-router-dom';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class WitnessArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={
      myData: {
        desc: "",
        title: "",
        url: "",
        image: ''
      },
      isresearcher: false,
      redirect: false,
      zoomInActive: false
    }
  }
  fetchIPFS = () => {
    fetch(`https://gateway.ipfs.io/ipfs/${this.props.data[0]}`)
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();

      })
      .then(data => {
        console.log(data.myData.image)
        this.setState({
          myData: {
            desc: data.myData.description,
            title: data.myData.title,
            url: data.myData.url,
            image: data.myData.image
          }
        })
      })
      .catch(err => console.log(`error: ${err}`))
  };

  // renderRedirect() {
  //   if (this.state.redirect) {
  //     return <Redirect to='/dashboard/researcher' />
  //   }
  // }
  // convertToTriveDeci = (num) => {
  //   let result = num.toString()
  //   let len = result.length;
  //   let res = result.substring(0, len-4) + "." + result.substring(len-2);
  //   console.log('hi')
  //   return res
  // }
  zoomInFunc = () => {
    this.setState({zoomInActive: !this.state.zoomInActive})
  }

  componentDidMount(){
    this.fetchIPFS();
  }
  render() {
    // const { data } = this.props;
    const style = {
      'text-align': 'left',
      'border-bottom': '0.5px solid #fff'
    }
    const zoomIn = (<Jumbotron onClick={this.zoomInFunc}>
      <h1>{this.state.myData.title}</h1>
      <img src={this.state.myData.image} className='showImage' alt=""/>

      <p>
        Description of the problem: <br />
        {this.state.myData.desc}
      </p>
      {this.props.curUserInfo.rank >= 1 && <Button bsStyle="warning" ><Link to={`/dashboard/witness/${this.props.articleId}`} >Witness This Article!</Link></Button>}<Button bsStyle="primary" href={this.state.myData.url} target="_blank">Link to the article</Button>
    </Jumbotron>)
    const listItem = (<Media style={style} className='article-intro' onClick={this.zoomInFunc}>
      <Media.Left>
        <img width={64} height={64} src={this.state.myData.image} alt="thumbnail" />
      </Media.Left>
      <Media.Body>
        <Media.Heading>{this.state.myData.title}</Media.Heading>
        <p>
          Description of the problem: <br />
          {this.state.myData.desc}
        </p>
      </Media.Body>
    </Media>)

    return (
      <div>
        {this.state.zoomInActive && zoomIn}
        {!this.state.zoomInActive && listItem}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({

  // instantiateTriveContract,
  // storeWeb3Account,
  // currentUserInformation
}, dispatch);

const mapStateToProps = (state) => {
	return ({
    curUserInfo: state.currentUserInfo.curUserInfo,
    account: state.trive.account,
    trive: state.trive.contracts
  //activeAccount: state.web3.activeAccount
})
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WitnessArticleInfo));
