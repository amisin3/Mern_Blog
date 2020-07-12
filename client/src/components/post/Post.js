import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost, addLikes, removeLikes } from "../../actions/post";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import ReactHtmlParser from "react-html-parser";

const Post = ({
  getPost,
  addLikes,
  removeLikes,
  post: { post, loading },
  match,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="post-container">
        <div className="post-detail-first">
          <h1>{post.title}</h1>
        </div>
        <div className="post-detail-second">
          <div className="post-detail-second-image-name-time">
            <Link to={`/profile/${post.user}`}>
              <img className="round-img img-size" src={post.avatar} alt="" />{" "}
            </Link>
            <div className="post-detail-second-name-time">
              {post.name} <Moment format="MMM Do, YYYY">{post.date}</Moment>
            </div>
          </div>
          <div className="btn-margin text-center post-detail-second-likes">
            <button
              onClick={(e) => addLikes(post._id)}
              type="button"
              class="btn btn-light"
            >
              <i class="fas fa-thumbs-up"></i>{" "}
              <span>
                {post.likes.length > 0 && <span>{post.likes.length}</span>}
              </span>
            </button>
            <button
              onClick={(e) => removeLikes(post._id)}
              type="button"
              class="btn btn-light"
            >
              <i class="fas fa-thumbs-down"></i>
            </button>
          </div>
        </div>
        <div className="text-center post-text post-detail-content">
          <p className="justify-text">{ReactHtmlParser(post.text)}</p>
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  addLikes: PropTypes.func.isRequired,
  removeLikes: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost, addLikes, removeLikes })(
  Post
);
