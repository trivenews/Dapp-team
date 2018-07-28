import React, {Component} from "react";
class ShowArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }


  render() {
    const check = this.props.articleIdLoaded ? (<div>
      <p>hash: </p>
      <p>researcherHash:</p>
      <p>reward:</p>
      <p>status</p>
    </div>) : (<h1>shit happens</h1>)
    return (
      {check}
    );
  }
}


export default ShowArticleInfo;
