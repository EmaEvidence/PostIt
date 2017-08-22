import React from 'react';
import { connect } from 'react-redux';
import UIAutocomplete from 'react-ui-autocomplete';
import CreateGroup from './CreateGroup';
import createGroupAction from '../actions/createGroupAction';
import postMessageAction from '../actions/postMessageAction';

/**
 * [state description]
 * @type {Object}
 */
class CreateMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: '',
      message: '',
      priority: 'Select a Priority',
      charactersLeft: 300
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.charactersRemaining = this.charactersRemaining.bind(this);
  }

  /**
   * [onChange description]
   * @method onChange
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  /**
   * [handleValueChange description]
   * @method handleValueChange
   * @param  {[type]}          newValue     [description]
   * @param  {[type]}          displayValue [description]
   * @param  {[type]}          suggestion   [description]
   * @return {[type]}                       [description]
   */
  handleValueChange(newValue, displayValue, suggestion) {
    this.setState({
      group: newValue,
    });
  }
  /**
   * [charactersRemaining description]
   * @method charactersRemaining
   * @param  {[type]}            e [description]
   * @return {[type]}              [description]
   */
  charactersRemaining(e) {
    const charactersLeft = 300 - (e.target.value).length;
    this.setState({
      charactersLeft
    });
  }
  /**
   * [sendMessage description]
   * @method sendMessage
   * @param  {[type]}    e [description]
   * @return {[type]}      [description]
   */
  sendMessage(e) {
    e.preventDefault();
    this.props.postMessageAction({
      id: this.state.group,
      message: this.state.message,
      priority: this.state.priority
    });
  }
  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    const createGroup = this.props.createGroupAction;
    const groups = this.props.groups;
    const getOptions = () => JSON.parse(groups)['0'];
    return (
      <div className=" deep-purple lighten-5">
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-1" />
              <div className="col-sm-10">
                <form onSubmit={this.sendMessage}>
                  <fieldset className="postfieldset">
                    <legend>Send Message</legend>
                    <span className="alert"> {this.props.status} </span>
                    <div className="form-group row customcontrol">
                      <div className="form-control col s6 bordered-element extended">
                        <label htmlFor="UIAutocomplete"> Type Group Name </label>
                        <UIAutocomplete
                          options={getOptions()}
                          name="group"
                          onChange={this.handleValueChange}
                          optionValue="id"
                          optionFilter={['group_name']}
                          optionLabelRender={option => `${option.group_name}`}
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
                        <label htmlFor="input"> Attach a file </label>
                        <input
                          type="file"
                          className="form-control bordered-element"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        placeholder="Your Message"
                        className="form-control bordered-element customtextarea"
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
              <div className="col-sm-1" />
            </div>
          </div>
          <div className="col-sm-2" />
        </div>
        <CreateGroup createGroupAction={createGroup} />
      </div>
    );
  }
}

CreateMessage.propTypes = {
  createGroupAction: React.PropTypes.func.isRequired,
  groups: React.PropTypes.string.isRequired,
  postMessageAction: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired
};
/**
 * [mapStateToProps description]
 * @method mapStateToProps
 * @param  {[type]}        state [description]
 * @return {[type]}              [description]
 */
function mapStateToProps(state) {
  let groups = '';
  if (state.getUserGroupsReducer.groups !== undefined) {
    groups = JSON.stringify(state.getUserGroupsReducer.groups);
  } else {
    groups = ['No Group Yet'];
  }
  return {
    groups,
    status: state.postMessageReducer.status
  };
}

export default connect(mapStateToProps, { createGroupAction, postMessageAction })(CreateMessage);
