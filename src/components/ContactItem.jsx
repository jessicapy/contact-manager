import 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact, onSelectContact }) => {
  return (
    <div 
      className="contact-item"
      onClick={() => onSelectContact(contact)}
      role="button"
      tabIndex={0}
    >
      <h3>{contact.fullname}</h3>
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
  onSelectContact: PropTypes.func.isRequired,
};

export default ContactItem;