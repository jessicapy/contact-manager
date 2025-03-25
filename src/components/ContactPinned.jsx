import 'react';
import PropTypes from 'prop-types';

const ContactPinned = ({ contact, onClearContact }) => {
  if (!contact) {
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
          onClick={onClearContact}
          aria-label="Clear featured contact"
        >
          ❌ Clear Contact
        </button>
      </div>
      <div className="contact-pinned-card">
        <div className="contact-avatar">
          {contact.fullname[0].toUpperCase()}
        </div>
        <div className="contact-details">
          <h3>{contact.fullname}</h3>
          <div className="contact-info">
            <p><span className="icon">📞</span> {contact.phonenumber}</p>
            <p><span className="icon">✉️</span> {contact.email}</p>
            <p><span className="icon">📑</span> {contact.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactPinned.propTypes = {
  contact: PropTypes.shape({
    fullname: PropTypes.string,
    phonenumber: PropTypes.string,
    email: PropTypes.string,
    type: PropTypes.string,
  }),
  onClearContact: PropTypes.func.isRequired,
};

export default ContactPinned;