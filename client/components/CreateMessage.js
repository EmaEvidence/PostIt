import React from 'react';
import CreateGroup from './CreateGroup';

class CreateMessage extends React.Component {
  render() {
    return (
      <div className=" deep-purple lighten-5">
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-1" />
              <div className="col-sm-10">
                <form>
                  <fieldset className="postfieldset">
                    <legend>Send Message</legend>
                    <div className="form-group row customcontrol">
                      <div className="form-control col s6 bordered-element">
                        <input
                          type="text"
                          id="autocomplete-input"
                          className="autocomplete form-control bordered-element"
                          placeholder="Group Name. e.g Cohort"
                        />
                      </div>
                      <div className="col s1" />
                      <select className="form-control col s5 bordered-element" required >
                        <option value="">Select a Priority</option>
                        <option value="">Normal</option>
                        <option value="">Urgent</option>
                        <option value="">Critical</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea
                        placeholder="Your Message"
                        className="form-control bordered-element customtextarea"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label> Attach a file </label>
                      <input
                        type="file"
                        className="form-control bordered-element"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        className="form-control btn deep-purple lighten-3 custombutton"
                        value="Send"
                        required
                      />
                    </div>
                  </fieldset>
                </form>
              </div>
              <div className="col-sm-1" />
            </div>
          </div>
          <div className="col-sm-2" />
        </div>
        <CreateGroup />
      </div>
    );
  }
}

export default CreateMessage;
