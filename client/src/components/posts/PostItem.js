import React, { useEffect, Fragment } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost, addLikes, removeLikes } from "../../actions/post";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const PostItem = ({
  auth,
  deletePost,
  addLikes,
  removeLikes,
  showActions,
  post: { _id, title, short_desc, name, avatar, user, likes, comments, date },
}) => (
  <div class="post">
    <div className="post-header">
      <Link to={`/profile/${user}`}>
        <img class="round-img post-user-image" src={avatar} alt="" />
      </Link>
      <div className="user-name-date">
        <h4>{name}</h4>
        <p class="post-date">{<Moment format="MMM Do, YYYY">{date}</Moment>}</p>
      </div>
    </div>
    <div>
      <h1>{title}</h1>
      <p class="my-1">{short_desc}</p>

      {showActions && (
        <Fragment>
          <button
            onClick={(e) => addLikes(_id)}
            type="button"
            class="btn btn-light"
          >
            <i class="fas fa-thumbs-up"></i>{" "}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={(e) => removeLikes(_id)}
            type="button"
            class="btn btn-light"
          >
            <i class="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/posts/${_id}`} class="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span class="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deletePost(_id)}
              type="button"
              class="btn btn-danger"
            >
              <i class="fas fa-times"></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeLikes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLikes, removeLikes })(
  PostItem
);
