import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import firebase from "../../firebase";
import { Input } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostForm = ({ addPost, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    short_desc: "",
    text: "",
    image: "",
  });

  const { title, short_desc, text, image } = formData;

  let [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState({
    imgUrl: "",
  });

  let { imgUrl } = imageAsUrl;

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageAsFile) => image);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e, editor) => {
    setFormData({ ...formData, text: editor.getData() });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("start upload");
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = firebase
      .storage()
      .ref(`/post_images/${imageAsFile.name}`)
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
          .ref("post_images")
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
            console.log(imgUrl);
            addPost(formData, imgUrl, history);
            // }
            // console.log(imgUrl);
          });
      }
    );
  };
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form class="form my-1" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="title"
          placeholder="Add a Title"
          value={title}
          onChange={(e) => onChange(e)}
        />
        <br />
        <Input
          fluid
          label="File types: jpg, png"
          name="file"
          type="file"
          onChange={handleImageAsFile}
        />
        <br />
        <textarea
          name="short_desc"
          cols="10"
          rows="2"
          placeholder="Add Short Description"
          value={short_desc}
          onChange={(e) => onChange(e)}
          required
        ></textarea>
        <br />
        {/* <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => onChange(e)}
          required
        ></textarea> */}
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from ckeditor</p>"
          onInit={(editor) => {
            // Hello
          }}
          onChange={handleChange}
          required
        />
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(withRouter(PostForm));
