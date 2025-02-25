import React from 'react';
import Header from './components/Header';
import ContactDetail from './components/ContactDetail';
import ContactList from './components/ContactList';
import contacts from './data/contacts';
import './App.css';

function App() {
  // Using the first contact as the featured contact
  const featuredContact = contacts[0];

  return (
    <div className="App">
      <Header />
      <main className="app-main">
        <ContactDetail contact={featuredContact} />
        <ContactList contacts={contacts} />
      </main>
    </div>
  );
}

export default App;