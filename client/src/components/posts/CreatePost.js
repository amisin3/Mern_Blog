import React, { Fragment } from "react";
import PropTypes from "prop-types";
import PostForm from "./PostForm";

const CreatePost = props => {
  return (
    <Fragment>
      <PostForm />
    </Fragment>
  );
};

CreatePost.propTypes = {};

export default CreatePost;
