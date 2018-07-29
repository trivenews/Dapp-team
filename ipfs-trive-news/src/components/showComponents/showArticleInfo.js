import React, { Component } from "react";
import {Jumbotron, Label, Media, Button} from "react-bootstrap";


class ShowArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={
      myData: {
        desc: "",
        title: "",
        url: ""
      }
    }
    this.fetchIPFS = this.fetchIPFS.bind(this);
  }
  fetchIPFS() {
    fetch(`https://gateway.ipfs.io/ipfs/${this.props.data[0]}`)
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();

      })
      .then(data => {
        this.setState({
          myData: {
            desc: data.myData.description,
            title: data.myData.title,
            url: data.myData.url
          }
        })
      })
      .catch(err => console.log(`error: ${err}`))
  };
  componentDidMount(){
    this.fetchIPFS();
  }
  render() {
    const { data } = this.props;

    return (
      <div>
        <Jumbotron>
          <h1>{this.state.myData.title}</h1>
          <p><small>Status: {data[3].c[0]} | Reward: {data[2].c[0]}TRV | Hash: {data[0]}</small></p>
          <p>
            Description of the problem: <br />
            {this.state.myData.desc}
          </p>
          <Button bsStyle="primary" href={this.state.myData.url} target="_blank">Link to the article</Button>
          <p><small> ResearcherHash: {data[1]}</small></p>
        </Jumbotron>
      </div>
    );
  }
}
export default ShowArticleInfo;
