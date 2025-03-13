import React, { useState } from 'react';
import ContactList from './components/ContactList';
import ContactPinned from './components/ContactPinned';
import contacts from './data/contacts.json';
import './components/ContactList.css';

function App() {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleClearContact = () => {
    setSelectedContact(null);
  };

  return (
    <div className="app">
      <h1>Contact Manager</h1>
      <ContactPinned 
        selectedContact={selectedContact} 
        onClear={handleClearContact}
      />
      <ContactList 
        contacts={contacts.contacts} 
        onSelectContact={handleSelectContact}
      />
    </div>
  );
}

export default App;