import PropTypes from 'prop-types';
import ContactList from '../components/ContactList';
import ContactPinned from '../components/ContactPinned';

const ContactListPage = ({ contacts, isLoading, onSelectContact, pinnedContact, onClearContact }) => {
  return (
    <div className="page">
      <ContactPinned 
        contact={pinnedContact}
        onClearContact={onClearContact}
      />
      <ContactList 
        contacts={contacts}
        isLoading={isLoading}
        onSelectContact={onSelectContact}
      />
    </div>
  );
};

ContactListPage.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullname: PropTypes.string.isRequired,
      phonenumber: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSelectContact: PropTypes.func.isRequired,
  pinnedContact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    phonenumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }),
  onClearContact: PropTypes.func.isRequired
};

export default ContactListPage;