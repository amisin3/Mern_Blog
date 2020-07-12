import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Label, Icon, Divider, Header } from "semantic-ui-react";
import { getAllPosts } from "../../actions/post";
import { connect } from "react-redux";
import PostItem from "../posts/PostItem";

const ProfileTop = ({
  profile: {
    location,
    social,
    user: { _id, name, avatar },
    bio,
    profile_photo,
  },
  post: { loading, posts },
  getAllPosts,
}) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  let postsLength = 0;
  return (
    <Fragment>
      <div className="profiles-top">
        <div className="profile-left">
          <h1 class="large">{name}</h1>
          <p>Location {location && <span>{location}</span>}</p>
          <p>Bio {bio}</p>
          <div class="icons my-1">
            {social && social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-twitter fa-2x"></i>
              </a>
            )}

            {social && social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-facebook fa-2x"></i>
              </a>
            )}

            {social && social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fab fa-instagram fa-2x"></i>
              </a>
            )}
          </div>
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
        <div className="profile-right">
          <img className="profile-image round-img" src={profile_photo} alt="" />
        </div>
      </div>
      <Divider horizontal>
        <Header as="h2" color="blue">
          <Icon name="pen square" color="blue" />
          Posts
        </Header>
      </Divider>

      <div className="posts">
        {posts.map(
          (post) => post.user === _id && <PostItem key={post._id} post={post} />
        )}
      </div>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(ProfileTop);
