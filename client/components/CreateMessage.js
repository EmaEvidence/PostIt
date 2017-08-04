import React from 'react';
import { connect } from 'react-redux';
import UIAutocomplete from 'react-ui-autocomplete';
import CreateGroup from './CreateGroup';
import createGroupAction from '../actions/createGroupAction';

class CreateMessage extends React.Component {
  constructor(props){
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

  onChange(e) {
      this.setState({
        [e.target.name]: e.target.value,
      });
  }

  handleValueChange(newValue, displayValue, suggestion) {
    this.setState({
      group: newValue,
    });
  }

  charactersRemaining(e) {
    const charactersLeft = 300 - (e.target.value).length;
    this.setState({
      charactersLeft
    });
  }

  sendMessage(e) {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    const getOptions = () => ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
    const createGroup = this.props.createGroupAction;
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
                    <div className="form-group row customcontrol">
                      <div className="form-control col s6 bordered-element extended">
                        <label htmlFor="UIAutocomplete"> Type Group Name </label>
                        <UIAutocomplete
                          options={getOptions()}
                          name="group"
                          onChange={this.handleValueChange}
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
  createGroupAction: React.PropTypes.func.isRequired
};
export default connect(null, { createGroupAction })(CreateMessage);
