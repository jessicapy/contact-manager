import React, { useState } from 'react';
import Header from './components/Header';
import ContactPinned from './components/ContactPinned';
import ContactList from './components/ContactList';
import contacts from './data/contacts';
import './App.css';

function App() {
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