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

export default ContactListPage;