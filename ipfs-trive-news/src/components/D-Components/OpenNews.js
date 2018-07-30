import React, {Component} from "react";
import contract from 'truffle-contract';
import web3 from '../../web3';
import ShowArticleInfo from "../showComponents/showArticleInfo";


class OpenNews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleIds: [],
      articles: []
    }
    this.getTaskByState = this.getTaskByState.bind(this);
    this.findArticleInfo = this.findArticleInfo.bind(this);
  }

  getTaskInfo(articleId) {
    const TriveDapp = this.props.myContract;
    var TriveDappInstance;
    TriveDapp.deployed().then((instance) => {
      TriveDappInstance = instance;
      return TriveDappInstance._getTaskInfo(articleId)
    }).then((result) => {
      console.log(result)
      var articles = [...this.state.articles];
      articles.push(<ShowArticleInfo myContract={this.props.myContract} articleId={articleId} key={articleId} data={result} curAddr={this.props.curAddr}/>);

      this.setState({
        articles
      });
    }).catch((error) => {
      console.log(error)
    })
  }

  findArticleInfo(arr) {
    let res = [];
    arr.map(num => {
      res.push(parseInt(num.toString()))
    });
    console.log(res);
    this.setState({
      articleIds: res
    });

    res.forEach((num) => {
      this.getTaskInfo(num);
    });
  }

  getTaskByState() {
    const TriveDapp = this.props.myContract;
    var TriveDappInstance;
    TriveDapp.deployed().then((instance) => {
      TriveDappInstance = instance;
      return TriveDappInstance._getTasksByState(0, 0)
    }).then((result) => {
      this.findArticleInfo(result);
    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getTaskByState();
  }
  render() {
    return (
      <div>
        <h1>Open NEWS</h1>
        <hr />
        {this.state.articles}
      </div>
    )
  }
}

export default OpenNews;
