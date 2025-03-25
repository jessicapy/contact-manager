import { useState } from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ContactPinned from './components/ContactPinned';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pinnedContact, setPinnedContact] = useState(null);

  const saveContact = async (contactData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error('Error al guardar el contacto');
      }

      const savedContact = await response.json();
      setContacts(prevContacts => [...prevContacts, savedContact]);
      return true;
    } catch {
      setError('Error al guardar el contacto');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL);
      if (!response.ok) {
        throw new Error('Error al cargar contactos');
      }
      const data = await response.json();
      setContacts(data);
    } catch {
      setError('Error al cargar contactos');
    } finally {
      setIsLoading(false);
    }
  };

  const renderError = () => {
    if (!error) return null;

    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button"
          onClick={fetchContacts}
          disabled={isLoading}
        >
          🔄 Reintentar
        </button>
      </div>
    );
  };

  const handleAddContact = async (newContact) => {
    const success = await saveContact(newContact);
    if (success) {
      console.log('Contact saved successfully');
    }
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
        <div className="controls">
          <button 
            onClick={fetchContacts}
            disabled={isLoading}
            className="fetch-button"
          >
            {isLoading ? 'Cargando...' : '📥 Cargar Contactos'}
          </button>
          {error && renderError()}
        </div>
        
        <ContactPinned 
          contact={pinnedContact} 
          onClearContact={handleClearContact}
        />
        <ContactList 
          contacts={contacts}
          isLoading={isLoading}
          onSelectContact={handleSelectContact}
        />
        <ContactForm 
          onAddContact={handleAddContact}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;