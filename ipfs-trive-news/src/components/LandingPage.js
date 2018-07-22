import React, { Component } from 'react';

class landingPage extends Component {


  render() {
    return (
      <div>
        <div className="App-header">
          <img src="https://trive.news/wp-content/uploads/2018/03/trive-logo-icon.png" className="App-logo" alt="logo" />
          <br /><br /><br />
          <img src="https://trive.news/wp-content/uploads/2018/01/discover-banner-4.png" alt="description" />
          <br /><br />
        </div>

        <div className="join">
          <h1>JOIN US ONLINE</h1>
          <h3>Got Questions? You Can Talk To Us Via These Channels</h3>

        </div>

        <div className="buzz">
          <h1>
            <img src="https://trive.news/wp-content/uploads/2018/03/trive-logo-icon.png" alt="logo"/>
            Join Our Newsletter
          </h1>
        </div>
      </div>
    )
  }
}

export default landingPage;
