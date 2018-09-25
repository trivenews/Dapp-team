import React, { Component } from 'react';
import {Grid, Row, Col, Image} from "react-bootstrap";
// import {Link} from "react-router-dom";

class landingPage extends Component {


  render() {
    return (
      <div>
        <div className="App-header">

          <img src="https://trive.news/wp-content/uploads/2018/01/discover-banner-4.png" alt="description" className="landing-pic"/>
          <br /><br />
        </div>

        <div className="buzz-news">
          <img src="https://trive.news/wp-content/uploads/2018/01/AsSeenOn-Img.png" alt="Seen On" className="seen-on"/>
          <h1>
            <img src="https://trive.news/wp-content/uploads/2018/03/trive-logo-icon.png" alt="logo"/>
            &nbsp;  Trive Buzz
          </h1>
          <Grid>
            <Row>
              <Col xs={6} md={3}>
                <Image src="https://trive.news/wp-content/uploads/2018/05/carousel-8-btc-investing-news.png" thumbnail />
                <br /><br />
                <p>This is the description erea.<br /><small className="buzz-news-small">the date</small></p>

              </Col>
              <Col xs={6} md={3}>
                <Image src="https://trive.news/wp-content/uploads/2018/03/carousel-bitcoin-investing-news.jpg" thumbnail />
                <br /><br />
                <p>This is the description erea.<br /><small className="buzz-news-small">the date</small></p>

              </Col>
              <Col xs={6} md={3}>
                <Image src="https://trive.news/wp-content/uploads/2018/03/carousel-1-1.jpg" thumbnail />
                <br /><br />
                <p>This is the description erea.<br /><small className="buzz-news-small">the date</small></p>

              </Col>
              <Col xs={6} md={3}>
                <Image src="https://trive.news/wp-content/uploads/2018/05/carousel-8-techco.png" thumbnail />
                <br /><br />
                <p>This is the description erea.<br /><small className="buzz-news-small">the date</small></p>

              </Col>
            </Row>
          </Grid>
        </div>

        <div className="join">

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
            &nbsp; Join Our Newsletter
          </h1>
        </div>
      </div>
    )
  }
}

export default landingPage;
