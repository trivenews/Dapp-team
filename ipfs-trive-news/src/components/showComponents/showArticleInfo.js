import React, { Component } from "react";

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
        <p>researcherHash: {data[0]}</p>
        <p>researcherHash: {data[1]}</p>
        <p>reward: {data[2].c[0]}</p>
        <p>status: {data[3].c[0]}</p>
        <hr />
        <p>Description: {this.state.myData.desc}</p>
        <p>Title: {this.state.myData.title}</p>
        <p>URL: {this.state.myData.url}</p>
      </div>
    );
  }
}
export default ShowArticleInfo;
