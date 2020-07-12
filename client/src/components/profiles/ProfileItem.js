import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { getAllPosts } from "../../actions/post";
import { connect } from "react-redux";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    location,
    bio,
    profile_photo,
  },
  getAllPosts,
  post: { posts, loading },
}) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  // let [postsLength, setPostsLength] = useState(0);

  let postsLength = 0;

  return (
    <div className="profile bg-light">
      <div className="profile-top">
        <h2>{name}</h2>
      </div>
      <div className="profile-middle">
        <img src={profile_photo} alt="" className="profile-image round-img" />
        <div className="profile-middle-list-items">
          <p className="my-1">Location {location && <span>{location}</span>}</p>
          <p className="my-2">Bio {bio}</p>
        </div>
      </div>
      <div className="profile-bottom">
        <Button as="div" labelPosition="right">
          <Button color="red">
            <Icon name="users" />
          </Button>
          <Label as="a" basic color="red" pointing="left">
            2 followers
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button color="green">
            <Icon name="user plus" />
          </Button>
          <Label as="a" basic color="green" pointing="left">
            2 following
          </Label>
        </Button>
        <Link to={`/profile/${_id}`}>
          <Button as="div" labelPosition="right">
            <Button color="blue">
              <Icon name="user outline" />
            </Button>
            <Label as="a" basic color="blue" pointing="left">
              View Profile
            </Label>
          </Button>
        </Link>
        <Button as="div" labelPosition="right">
          <Button color="violet">
            <Icon name="edit outline" />
          </Button>
          <Label as="a" basic color="violet" pointing="left">
            {posts.map((post) => {
              if (post.user === _id) {
                postsLength = postsLength + 1;
              }
            })}
            {postsLength > 1 ? postsLength + " posts" : postsLength + " post"}
          </Label>
        </Button>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(ProfileItem);
