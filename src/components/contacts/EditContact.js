import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { connect } from "react-redux";
import { updateContact } from "../../actions/contactAction";
import PropTypes from "prop-types";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //Check for Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required." } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email is required." } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "phone is required." } });
      return;
    }

    const { id } = this.props.match.params;

    const updatedContact = {
      id,
      name,
      email,
      phone,
    };

    this.props.updateContact(updatedContact);

    //clearing the state and textFields
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {},
    });

    this.props.history.push("/");
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              value={name}
              placeholder="Enter Name..."
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              value={email}
              placeholder="Enter Email..."
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              value={phone}
              placeholder="Enter Phone..."
              onChange={this.onChange}
              error={errors.phone}
            />
            <input
              type="submit"
              className="btn btn-light btn-block"
              value="Update Contact"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditContact.propTypes = {
  updateContact: PropTypes.func.isRequired,
};

export default connect(null, { updateContact })(EditContact);
