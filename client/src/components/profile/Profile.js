import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import { Button, Icon, Label } from "semantic-ui-react";

const Profile = ({
  getProfileById,
  auth,
  profile: { profile, loading },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles">
            <Button as="div" labelPosition="right">
              <Button color="grey">
                <Icon name="left arrow" />
              </Button>
              <Label as="a" basic color="grey" pointing="left">
                Back To Profiles
              </Label>
            </Button>
          </Link>

          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile">
                <Button as="div" labelPosition="right">
                  <Button color="brown">
                    <Icon name="edit" />
                  </Button>
                  <Label as="a" basic color="brown" pointing="left">
                    Edit Profile
                  </Label>
                </Button>
              </Link>
            )}
          <div class="profile-view">
            <ProfileTop profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
