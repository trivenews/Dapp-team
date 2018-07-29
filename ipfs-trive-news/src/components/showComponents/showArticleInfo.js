import React, { Component } from "react";

class ShowArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }
  // fetchIPFS() {
  //   fetch('https://gateway.ipfs.io/ipfs/QmRGRUmVkXpCKKLWfdhorgZkSxiPYwLDVzJidTvwX8BBa8')
  //     .then(resp => {
  //       if (!resp.ok) {
  //         throw Error('oops: ', resp.message);
  //       }
  //       return resp.json();
  //     }).then(data => console.log(data))
  //     .catch(err => console.log(`error: ${err}`))
  // };
  render() {
    const check = this.props.articleIdLoaded ? (
      <div>
        <p>hash: </p>
        <p>researcherHash:</p>
        <p>reward:</p>
        <p>status</p>
      </div>
    ) : (<h1>shit happens</h1>);
    return (
      <div>
        { check }
      </div>
    );
  }
}
export default ShowArticleInfo;