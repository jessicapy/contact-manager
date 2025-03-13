import React from 'react';
import PropTypes from 'prop-types';

const ContactPinned = ({ selectedContact, onClear }) => {
  if (!selectedContact) {
    return (
      <div className="contact-pinned">
        <p>No contact selected</p>
      </div>
    );
  }

  return (
    <div className="contact-pinned">
      <div className="contact-pinned-header">
        <h2>Featured Contact</h2>
        <button 
          className="clear-button"
          onClick={onClear}
          aria-label="Clear featured contact"
        >
          ✖️ Clear
        </button>
      </div>
      <div className="contact-pinned-card">
        <h3>{selectedContact.fullname}</h3>
        <p>📞 {selectedContact.phonenumber}</p>
        <p>✉️ {selectedContact.email}</p>
        <p>📑 {selectedContact.type}</p>
      </div>
    </div>
  );
};

ContactPinned.propTypes = {
  selectedContact: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    phonenumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onClear: PropTypes.func.isRequired,
};

export default ContactPinned;