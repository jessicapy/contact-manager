import { useState, useEffect } from 'react';
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

  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL);
      
      if (!response.ok) {
        throw new Error('Error al cargar los contactos');
      }

      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Fetch contacts when component mounts
  useEffect(() => {
    fetchContacts();
  }, []);

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
    } catch (err) {
      setError('Error al guardar el contacto');
      console.error('Error saving contact:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = async (newContact) => {
    const success = await saveContact(newContact);
    if (!success) {
      // The error is already set in saveContact
      return;
    }
    console.log('Contact saved successfully:', newContact);
  };

  const handleSelectContact = (contact) => {
    setPinnedContact(contact);
  };

  const handleClearContact = () => {
    setPinnedContact(null);
  };

  const renderError = () => {
    if (!error) return null;
  
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
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
            {isLoading ? (
              <span className="loading-text">
                <span className="loading-spinner">⭕</span>
                Cargando...
              </span>
            ) : (
              '📥 Cargar Contactos'
            )}
          </button>
          {renderError()} {/* Replace the inline error with renderError() */}
        </div>
        
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner">⭕</div>
            <p>Cargando contactos...</p>
          </div>
        ) : (
          <>
            <ContactPinned 
              contact={pinnedContact}
              onClearContact={handleClearContact}
            />
            <ContactList 
              contacts={contacts}
              onSelectContact={handleSelectContact}
            />
            <ContactForm 
              onAddContact={handleAddContact}
              isLoading={isLoading}
            />
          </>
        )}
      </main>
    </div>
    
  );
}

export default App;