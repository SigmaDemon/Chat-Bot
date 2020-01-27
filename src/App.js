import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMessage } from "./Chat"; // this statement connects the Chat.js file and its functionalities with the App.js file

class App extends Component {
  render() {
    // This function will take the feed and the sendMessage out of the props
    const { feed, sendMessage } = this.props;
    return (
      <div>
        <h1>Chatty is in the Box!</h1>
        <ul>
          {feed.map(entry => (
            <li>{entry.text}</li>
          ))}
        </ul>
        <input
          // This function is used to create the text box used to input text
          // It allows the user to communicate with Chatty
          type="text"
          onKeyDown={e =>
            e.keyCode === 13 ? sendMessage(e.target.value) : null
          }
        />
      </div>
    );
  }
}

// The functions below are provided to implement the message sending procedure
// Messages will be sent from the chatbot to the user and vice-versa
const mapStateToProps = state => ({
  feed: state
});

export default connect(mapStateToProps, {
  sendMessage
})(App);
