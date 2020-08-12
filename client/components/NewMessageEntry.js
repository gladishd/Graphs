import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeMessage, postNewMessageEntry } from '../store/store.js';
class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {

    this.props.write(event.target.value);
  }
  handleSubmit(evt) {
    evt.preventDefault(); // don't forget to preventDefault!
    // our message content is on our state, which we're getting from our Redux store
    console.log(this.props)
    const content = this.props.newMessageEntry;

    // our channelId is available from the props sent by MessagesList, which it receives as props from the Route!
    const channelId = this.props.channelId;

    const name = this.props.reduxState.user.displayName || 'Guest'; // this should be by default.
    // when the user logs in, their real name should be
    // displayed.


    this.props.post({ content, channelId, name });
  }
  render() {

    console.log('the state in general, on the NewMessageEntry component, is ', this.props.reduxState)

    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.props.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newMessageEntry: state.addMessages.newMessageEntry,
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    userEmail: state.user.email,
    googleId: state.user.googleId,
    reduxState: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    write: (string) => dispatch(writeMessage(string)),
    post: (message) => dispatch(postNewMessageEntry(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
