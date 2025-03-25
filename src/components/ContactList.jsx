import 'react';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, isLoading, onSelectContact }) => {
  return (
    <div className={`contact-list ${isLoading ? 'loading' : ''}`}>
      {contacts.length === 0 && !isLoading ? (
        <p>No contacts available. Click &quot;Cargar Contactos&quot; to load.</p>
      ) : (
        contacts.map((contact, index) => (
          <ContactItem 
            key={index}
            contact={contact}
            onSelectContact={onSelectContact}
          />
        ))
      )}
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