import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onSelectContact }) => {
  return (
    <div className="contact-list">
      {contacts.map((contact, index) => (
        <ContactItem 
          key={index} 
          contact={contact} 
          onSelect={onSelectContact}
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
  onSelectContact: PropTypes.func.isRequired,
};

export default ContactList;