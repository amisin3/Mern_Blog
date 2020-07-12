import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <p className="lead">
            <q>Content is Anything that adds value to the Reader's Life</q>
          </p>
          {/* <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {};

export default Landing;
