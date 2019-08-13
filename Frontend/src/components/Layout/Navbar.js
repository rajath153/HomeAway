import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    
    const { isAuthenticated, user}=this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
      
        <li className="nav-item">
              <p className="nav-link" to="/">{user.name} <i className="fas fa-user-circle fa-lg" /></p>
        </li>
        <li className="nav-item">
              <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >

              {' '}
              Logout <i className="fas fa-sign-out-alt"/>
            </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li> 
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  <p>Sign Up <i className="fas fa-user-plus"/></p> 
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                <p>Traveller <i className="fas fa-sign-in-alt"/></p> 
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ownerlogin" className="nav-link">
                <p>Owner <i className="fas fa-sign-in-alt"/></p> 
                </Link>
              </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <p className="navbar-brand" >HomeAway</p>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              
            </ul>

            {isAuthenticated ? authLinks : guestLinks} 
          </div>
        </div>
      </nav>

    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser,clearCurrentProfile })(Navbar);