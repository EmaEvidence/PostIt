import React from 'react';
import { connect } from 'react-redux';
import UIAutocomplete from 'react-ui-autocomplete';
import PropTypes from 'prop-types';

import createGroupAction from '../actions/createGroupAction';
import postMessageAction from '../actions/postMessageAction';

/**
 * SendMessage
 * @type {Object}
 */
export class SendMessage extends React.Component {
  /**
   * constructor
   *
   * @method constructor
   * @param  {object} props
   *
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      group: '',
      message: '',
      priority: 'Select a Priority',
      charactersLeft: 300,
      groupName: '',
      display: 'none'
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.charactersRemaining = this.charactersRemaining.bind(this);
  }
  /**
   * componentWillReceiveProps change state value when new prop is passed
   * @method componentWillReceiveProps
   *
   * @return {object} initial state
   */
  componentWillReceiveProps() {
    this.setState({
      message: '',
      priority: 'Select a Priority',
      charactersLeft: 300,
    });
  }
  /**
   * onChange
   * @method onChange
   *
   * @param  {SyntheticEvent} event
   *
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * handleValueChange suggests groups once data is typed
   * @method handleValueChange
   *
   * @param  {string} newValue the selected value
   * @param  {string} displayValue display value
   * @param  {array} suggestion suggested names
   *
   * @return {void}
   */
  handleValueChange(newValue, displayValue, suggestion) {
    this.setState({
      group: newValue,
      groupName: displayValue
    });
  }
  /**
   * charactersRemaining displays the amount of characters Left
   * @method charactersRemaining
   *
   * @param  {SyntheticEvent} event
   *
   * @return {void}
   */
  charactersRemaining(event) {
    const charactersLeft = 300 - (event.target.value).length;
    this.setState({
      charactersLeft
    });
  }
  /**
   * sendMessage subits the form
   * @method sendMessage
   *
   * @param  {SyntheticEvent} event
   * @return {void}
   */
  sendMessage(event) {
    event.preventDefault();
    this.props.postMessageAction({
      id: this.state.group,
      message: this.state.message,
      priority: this.state.priority,
      groupName: this.state.groupName,
      currentGroup: this.props.currentGroup
    });
    this.setState({
      group: '',
      message: '',
      priority: 'Select a Priority',
      groupName: ''
    });
  }
  /**
   * render displays the html
   * @method render
   *
   * @return {ReactElement} markup
   */
  render() {
    let groups;
    if (JSON.parse(this.props.groups) === '' || JSON.parse(this.props.groups)[0] === '') {
      groups = [{ groupName: 'No Group Yet, Please create a Group First' }];
    } else {
      groups = JSON.parse(this.props.groups)['0'];
    }
    const getOptions = () => groups;
    return (
      <div className="col-sm-12 sendMessage" style={JSON.parse(this.props.display)}>
        <form onSubmit={this.sendMessage}>
          <fieldset className="postfieldset">
            <legend>Send Message</legend>
            <div className="form-group row customcontrol">
              <div className="form-control col s6 bordered-element extended">
                <label htmlFor="UIAutocomplete">Type Group Name
                </label>
                <UIAutocomplete
                  options={getOptions()}
                  name="group"
                  onChange={this.handleValueChange}
                  optionValue="id"
                  optionFilter={['groupName']}
                  optionLabelRender={option => `${option.groupName}`}
                />
              </div>
              <div className="col s1" />
              <div className="col s5 ">
                <select
                  className="form-control bordered-element extended"
                  required
                  name="priority"
                  value={this.state.priority}
                  onChange={this.onChange}
                >
                  <option>Select a Priority</option>
                  <option>Normal</option>
                  <option>Urgent</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                className="form-control bordered-element sendMessage-customtextarea"
                required
                name="message"
                value={this.state.message}
                onChange={this.onChange}
                onKeyUp={this.charactersRemaining}
                maxLength="300"
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="form-control btn deep-purple lighten-3 custombutton"
                value="Send"
                required
              />
              <span
                className="character-control"
              >
                {this.state.charactersLeft} Characters Left </span>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

SendMessage.propTypes = {
  groups: PropTypes.string.isRequired,
  postMessageAction: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
  currentGroup: PropTypes.string.isRequired
};
/**
 * mapStateToProps makes the store data available
 * @method mapStateToProps
 *
 * @param  {object} state the store date
 *
 * @return {object} the data needed by the component
 */
const mapStateToProps = (state) => {
  let groups = '';
  if (state.groupReducer.groups !== undefined) {
    groups = JSON.stringify(state.groupReducer.groups);
  } else {
    groups = ['None'];
  }
  return {
    currentGroup: state.setCurrentMessagesReducer.currentGroup,
    groups
  };
};

export default connect(mapStateToProps, { createGroupAction,
  postMessageAction })(SendMessage);
