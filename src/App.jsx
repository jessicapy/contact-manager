import { useState } from 'react';
import Header from './components/Header';
import ContactPinned from './components/ContactPinned';
import ContactList from './components/ContactList';
// Update the import path to match your contacts.json location
import contactsData from './data/contacts.json';
import './App.css';

function App() {
  // Use contactsData.contacts if your JSON has a contacts property
  const [contacts] = useState(contactsData.contacts);
  const [pinnedContact, setPinnedContact] = useState(null);

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