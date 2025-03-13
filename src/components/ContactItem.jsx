import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact, onSelect }) => {
  return (
    <div className="contact-item" onClick={() => onSelect(contact)}>
      <h3>{contact.fullname}</h3>
      <p>📞 {contact.phonenumber}</p>
      <p>✉️ {contact.email}</p>
      <p>📑 {contact.type}</p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    phonenumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ContactItem;