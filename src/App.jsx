import { useState } from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ContactPinned from './components/ContactPinned';
import ContactList from './components/ContactList';
import contactsData from './data/contacts.json';
import './App.css';

function App() {
  const [contacts, setContacts] = useState(contactsData.contacts);
  const [pinnedContact, setPinnedContact] = useState(null);

  const handleAddContact = (newContact) => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleSelectContact = (contact) => {
    setPinnedContact(contact);
  };

  const handleClearContact = () => {
    setPinnedContact(null);
  };

  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <ContactForm onAddContact={handleAddContact} />
        <ContactPinned 
          contact={pinnedContact} 
          onClearContact={handleClearContact}
        />
        <ContactList 
          contacts={contacts} 
          onSelectContact={handleSelectContact}
        />
      </main>
    </div>
  );
}

export default App;