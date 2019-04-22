import React, { Component } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

class ProfileCreds extends Component {
  render() {
    const { experience } = this.props;

    const expItems = experience.map((exp, index) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <strong>Title:</strong> {exp.title}
        </p>
        <p>
          <strong>Description:</strong> {exp.text}
        </p>
        <p>
          <strong>Date:</strong> <Moment format="YYYY/MM/DD">{exp.date}</Moment>
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center text-info">Experiences</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  experience: PropTypes.array
};

export default ProfileCreds;
