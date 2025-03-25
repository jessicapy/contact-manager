import { useState } from 'react';
import PropTypes from 'prop-types';

const ContactForm = ({ onAddContact, isLoading }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    phonenumber: '',
    email: '',
    type: 'social'
  });

  const [errors, setErrors] = useState({
    fullname: '',
    phonenumber: '',
    email: ''
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'fullname':
        return value.length < 3 ? 'Name must be at least 3 characters' : '';
      case 'phonenumber':
        return !/^\(\d{3}\)\s\d{3}-\d{4}$/.test(value) 
          ? 'Phone must be in format: (123) 123-1234' 
          : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    const error = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const isFormValid = () => {
    return (
      formData.fullname.length > 0 &&
      formData.phonenumber.length > 0 &&
      formData.email.length > 0 &&
      !errors.fullname &&
      !errors.phonenumber &&
      !errors.email
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      await onAddContact(formData);
      if (!isLoading) {
        setFormData({
          fullname: '',
          phonenumber: '',
          email: '',
          type: 'social'
        });
      }
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Add New Contact</h2>
      
      <div className="form-group">
        <label htmlFor="fullname">Full Name:</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        {errors.fullname && <span className="error-message">{errors.fullname}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phonenumber">Phone Number:</label>
        <input
          type="tel"
          id="phonenumber"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          placeholder="(123) 123-1234"
          disabled={isLoading}
          required
        />
        {errors.phonenumber && <span className="error-message">{errors.phonenumber}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="type">Contact Type:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="familia">Family</option>
          <option value="trabajo">Work</option>
          <option value="social">Social</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={!isFormValid() || isLoading}
      >
        {isLoading ? 'Guardando...' : 'Guardar Contacto'}
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

ContactForm.defaultProps = {
  isLoading: false
};

export default ContactForm;