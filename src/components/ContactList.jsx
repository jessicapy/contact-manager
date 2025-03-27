import 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './ContactList.css';

const ContactList = ({ contacts, isLoading }) => {
  const navigate = useNavigate();

  const handleContactClick = (contact) => {
    navigate(`/contact/${contact.id}`);
  };

  if (isLoading) {
    return <div className="contact-list loading">Loading contacts...</div>;
  }

  if (contacts.length === 0) {
    return (
      <div className="contact-list empty">
        <p>No contacts available</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      {contacts.map(contact => (
        <div 
          key={contact.id}
          className="contact-card"
          onClick={() => handleContactClick(contact)}
        >
          <div className="contact-info-preview">
            <span className="contact-name">{contact.fullname}</span>
            <span className="contact-type">{contact.type}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullname: PropTypes.string.isRequired,
      phonenumber: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ContactList;