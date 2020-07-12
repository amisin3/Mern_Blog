import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect, createSelectorHook } from "react-redux";
import { createProfile } from "../../actions/profile";
import { Input } from "semantic-ui-react";
import mime from "mime-types";
import firebase from "../../firebase";
import uuidv4 from "uuid/v4";

const CreateProfile = ({ createProfile, history }) => {
  let [formData, setFormData] = useState({
    location: "",
    bio: "",
    social: "",
    twitter: "",
    facebook: "",
    instagram: "",
    profile_photo: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  let { location, bio, twitter, facebook, instagram, profile_photo } = formData;

  // Uploading file to firebase
  let [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState({
    imgUrl: "",
  });

  let { imgUrl } = imageAsUrl;

  // console.log(imageAsFile);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageAsFile) => image);
    console.log();
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        // console.log(snapShot);
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
            console.log(fireBaseUrl);
            imgUrl = fireBaseUrl;
            // setFormData({
            //   ...formData,
            //   profile_photo: fireBaseUrl,
            // });
            // if (profile_photo !== null) {

            createProfile(formData, imgUrl, history);
            // }
            // console.log(imgUrl);
          });
      }
    );

    // createProfile(formData, history);
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
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              City state suggested (eg. Boston, MA)
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
        {profile_photo ? <img src={profile_photo} alt="image tag" /> : null}
      </Fragment>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
