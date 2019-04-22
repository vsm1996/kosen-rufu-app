import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import PropTypes from "prop-types";
class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    /*Experience list
    const experiences = profile.experiences.map((exp, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {exp}
      </div>
    ));  */
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? null : <span>{profile.bio}</span>}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.protoTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileAbout;
