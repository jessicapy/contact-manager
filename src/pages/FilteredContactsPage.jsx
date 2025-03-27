import { useParams } from 'react-router-dom';
import ContactList from '../components/ContactList';

const FilteredContactsPage = ({ contacts, onSelectContact }) => {
  const { type } = useParams();
  
  const filteredContacts = type === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.type === type);

  return (
    <div className="filtered-contacts">
      <h2>
        {type === 'all' 
          ? 'Todos los Contactos' 
          : `Contactos: ${type.charAt(0).toUpperCase() + type.slice(1)}`
        }
      </h2>
      <ContactList 
        contacts={filteredContacts}
        onSelectContact={onSelectContact}
      />
    </div>
  );
};

export default FilteredContactsPage;