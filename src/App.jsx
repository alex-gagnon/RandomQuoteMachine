import React from 'react';
import './App.css';

class App extends React.Component {  
  constructor(props) {
    super(props)
    
    this.state = {
      quotes: null,
      isLoaded: false,
      text: "",
      auhor: "",
    }
    
    this.handleClick = this.handleClick.bind(this)
  }
  
  getNewQuote() {
    let quotesLen = this.state.quotes.length
    let randomNum = Math.floor(Math.random() * (quotesLen + 1) + 1)
    let choice = this.state.quotes[randomNum]
    
    this.setState({
      text: choice.quote,
      author: choice.author
    })
  }
  
  handleClick() {
    this.getNewQuote()
  }
  
  componentDidMount() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', {
      headers: {
        Accept: "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
        this.setState({
        quotes: data.quotes, 
        isLoaded: true,
        text: data.quotes[0].quote,
        author: data.quotes[0].author         
      })
    })
    .catch(e => console.log(e))
  }
  
  render() {
    return (
      <div class="container">
        <div class="main">
          <h1 class="header">Random Quote Machine</h1>
          <div id="quote-box">
            <div>
              <div class="quote-docs">
                <p id="text">{this.state.text}</p>
                <p id="author">- {this.state.author}</p>
              </div>
              <div class="quote-actions">
                <div class="share-btns">
                  <a id="tweet-quote" href="twitter.com/intent/tweet">
                  <i class="fa fa-twitter fa-2x"></i></a>
                </div>
                <div>
                  <button id="new-quote" onClick={this.handleClick}>New quote</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
