import React, { Component } from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

class landingPage extends Component {


  render() {
    return (
      <div>
        <div className="App-header">

          <img src="https://trive.news/wp-content/uploads/2018/01/discover-banner-4.png" alt="description" />
          <br /><br />
        </div>

        <div className="join">
          <img src="https://trive.news/wp-content/uploads/2018/01/AsSeenOn-Img.png" alt="Seen On" className="seen-on"/>
          <h1>JOIN US ONLINE</h1>
          <h3>Got Questions? You Can Talk To Us Via These Channels</h3>
          <br />
          <Grid>
            <Row className="show-grid">
              <Col sm={12} md={6}>
                <a target="_blank" href="https://bitcointalk.org/index.php?topic=2275712.0http://"><img src="https://trive.news/wp-content/uploads/2018/01/btc-talk-button-300x70.png" alt="Bitcoin talk button" className="join-first-row"/></a>
                <br /><br />
                <p>BitcoinTalk is a message board where people interested in the details and the development of Bitcoin software can chat.</p>
              </Col>
              <Col sm={12} md={6}>
                <a target="_blank" href="https://www.reddit.com/r/Trive/" ><img src="https://trive.news/wp-content/uploads/2018/01/reddit-button-300x70.png" alt="Reddit button" className="join-first-row"/></a>
                <br /><br />
                <p>Our Reddit presence covers a number of topics including questions, interviews with Founder David Mondrus, announcements and more.</p>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col sm={12} md={4}>
                <a target="_blank" href="https://t.me/joinchat/GEM7Ew-um-f-zS01lN5N0w" ><img src="https://trive.news/wp-content/uploads/2018/01/telegram-button-orange-300x70.png" alt="Telegram button" /></a>
              </Col>
              <Col sm={12} md={4}>
                <a target="_blank" href="https://www.facebook.com/TriveNews/" ><img src="https://trive.news/wp-content/uploads/2018/01/facebook-button-orange-300x70.png" alt="Facebook button"/></a>
              </Col>
              <Col sm={12} md={4}>
                <a target="_blank" href="https://twitter.com/trive_news" > <img src="https://trive.news/wp-content/uploads/2018/01/twitter-button-orange-300x70.png" alt="Twitter button"/></a>
              </Col>
            </Row>
          </Grid>

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
