import React from 'react';

class CreateMessage extends React.Component {
  render() {
    return (
      <div className="container">
        <div>
        </div>
        <div className="row">
          <div className="col-sm-1" />
          <div className="col-sm-10">
            <form>
              <h2> Send Message </h2>
              <div className="form-group">
                <select className="form-control" required>
                  <option value="">Select a Group</option>
                  <option value="">Group 1</option>
                  <option value="">Group 2</option>
                  <option value="">Group 3</option>
                </select>
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" className="form-control" required />
              </div>
              <div className="form-group">
                <label> Attach a file </label>
                <input type="file" className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                <select className="form-control" required >
                  <option value="">Select a Priority</option>
                  <option value="">Priority 1</option>
                  <option value="">Priority 2</option>
                  <option value="">Priority 3</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="form-control btn btn-success teal"
                  value="Send"
                  required
                />
              </div>
            </form>
          </div>
          <div className="col-sm-1" />
        </div>
      </div>
    );
  }
}

export default CreateMessage;
