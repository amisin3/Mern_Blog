import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import firebase from "../../firebase";
import { Input } from "semantic-ui-react";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    location: "",
    bio: "",
    twitter: "",
    facebook: "",
    instagram: "",
    profile_photo: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    location,
    bio,
    twitter,
    facebook,
    instagram,
    profile_photo,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      location: loading || !profile.location ? "" : profile.location,
      bio: loading || !profile.bio ? "" : profile.bio,
      profile_photo:
        loading || !profile.profile_photo ? "" : profile.profile_photo,
      twitter: loading || !profile.social.twitter ? "" : profile.social.twitter,
      facebook:
        loading || !profile.social.facebook ? "" : profile.social.facebook,
      instagram:
        loading || !profile.social.instagram ? "" : profile.social.instagram,
      profile_photo:
        loading || !profile.profile_photo ? "" : profile.profile_photo,
    });
  }, [getCurrentProfile, loading]);

  // Uploading file to firebase
  const [imageAsFile, setImageAsFile] = useState("");
  let [imageAsUrl, setImageAsUrl] = useState({
    imgUrl: "",
  });

  let { imgUrl } = imageAsUrl;

  console.log(imageAsFile);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageAsFile) => image);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("start upload");
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = firebase
      .storage()
      .ref(`/profile_images/${imageAsFile.name}`)
      .put(imageAsFile);

    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        firebase
          .storage()
          .ref("profile_images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            // setImageAsUrl((prevObject) => ({
            //   ...prevObject,
            //   imgUrl: fireBaseUrl,
            // }));
            imgUrl = fireBaseUrl;
            // setFormData({
            //   ...formData,
            //   profile_photo: fireBaseUrl,
            // });
            // if (profile_photo !== null) {
            console.log(profile_photo);
            createProfile(formData, imgUrl, history);
            // }
            // console.log(imgUrl);
          });
      }
    );
  };

  return (
    <div>
      <Fragment>
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={(e) => onChange(e)}
            ></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>
          <Input
            fluid
            label="File types: jpg, png"
            name="file"
            type="file"
            onChange={handleImageAsFile}
          />
          {profile_photo ? (
            <img
              src={profile_photo}
              className="round-img-size round-img"
              alt="image tag"
            />
          ) : null}
          <div className="my-2">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="btn btn-light"
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    </div>
  );
};

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
