import 'react';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, isLoading, onSelectContact }) => {
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
      {contacts.map((contact, index) => (
        <ContactItem 
          key={index}
          contact={contact}
          onSelectContact={onSelectContact}
        />
      ))}
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      fullname: PropTypes.string.isRequired,
      phonenumber: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSelectContact: PropTypes.func.isRequired,
};

export default ContactList;