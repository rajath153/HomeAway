import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile,getCurrentProfile} from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      displaySocialInputs: false,
      handle:'',
      phonenumber: '',
      city: '',
      country: '',
      gender: '',
      company: '',
      school: '',
      hometown: '',
      languages: '',
      about: '',
    //   ID:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }
  componentDidMount(){
      this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;
  
        // Bring skills array back to CSV
        //const skillsCSV = profile.skills.join(',');
  
        // If profile field doesnt exist, make empty string
        profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
        profile.phonenumber = !isEmpty(profile.phonenumber) ? profile.phonenumber : '';
        profile.city = !isEmpty(profile.city) ? profile.city : '';
        profile.about = !isEmpty(profile.about) ? profile.about : '';
        profile.country = !isEmpty(profile.country) ? profile.country : '';
        profile.company = !isEmpty(profile.company) ? profile.company : '';
        profile.languages = !isEmpty(profile.languages) ? profile.languages : '';
        profile.hometown = !isEmpty(profile.hometown) ? profile.hometown : '';
  
        // Set component fields state
        this.setState({
          gender: profile.gender,
          phonenumber: profile.phonenumber,
          city: profile.city,
          about: profile.about,
          country: profile.country,
          company: profile.company,
          languages: profile.languages,
          hometown: profile.hometown
        });
      }
}

  onSubmit(e) {
    e.preventDefault();
    
    const profileData = {
      handle: this.state.handle,
      phonenumber: this.state.phonenumber,
      city: this.state.city,
      country: this.state.country,
      gender: this.state.gender,
      company: this.state.company,
      school: this.state.school,
      hometown: this.state.hometown,
      languages: this.state.languages,
      about: this.state.about
    //   ID:this.state.ID
    };
    
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    
    const { errors } = this.state;
    
    
    // Select options for gender
    const options = [
      { label: '* Select Gender', value: 0 },
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-10">
            </div>
            <div className="col-2">
              <Link to="/dashboard" className="btn btn-light">
                Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 m-auto">
              <h2 className="display-8 text-center">Edit Your Profile</h2>
              <p className="lead text-center">
                Update information about your profile
              </p>
            
              <form onSubmit={this.onSubmit}>
                
                <SelectListGroup
                  placeholder="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={options}
                  error={errors.gender}
                  info="Please Select your gender"
                />
                <TextFieldGroup
                  placeholder="Phone Number"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.onChange}
                  error={errors.phonenumber}
                  info="Please enter your active phone number"
                />
                <TextFieldGroup
                  placeholder="City"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="Country"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                  info="Enter the country (eg. USA, India)"
                />
                <TextFieldGroup
                  placeholder="* Languages"
                  name="languages"
                  value={this.state.languages}
                  onChange={this.onChange}
                  error={errors.languages}
                  info="Please use comma separated values (eg.
                    English, French, Spanish, Hindi)"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Enter your company or profession name"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="about"
                  value={this.state.about}
                  onChange={this.onChange}
                  error={errors.about}
                  info="Tell us a little about yourself"
                />
                
               
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


CreateProfile.propTypes = {
  createProfile:PropTypes.func.isRequired,
  getCurrentProfile:PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(CreateProfile));
