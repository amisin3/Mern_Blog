import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "../profiles/ProfileItem";

const Profiles = ({
  allProfiles,
  isAuthenticated,
  profile: { profiles, loading },
}) => {
  useEffect(() => {
    allProfiles();
  }, [allProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="bloggers-section">
            <div className="list-of-bloggers">
              <h1 className="large text-primary">Bloggers</h1>
              <p className="lead">
                <i className="fab fa-connectDevelop"></i> Top Listed Bloggers
              </p>
              <div className="profiles">
                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <h4>No profiles found....</h4>
                )}
              </div>
            </div>
            <div className="search-bloggers">
              <h1>Advanced Search</h1>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  allProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile,
});

export default connect(mapStateToProps, { allProfiles })(Profiles);
