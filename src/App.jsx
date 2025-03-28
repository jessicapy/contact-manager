import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ContactFilter from './components/ContactFilter';
import FilteredContactsPage from './pages/FilteredContactsPage';
import NewContactPage from './pages/NewContactPage';
import ContactDetailPage from './pages/ContactDetailPage';
import { saveToLocalStorage, loadFromLocalStorage } from './services/storageService';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeContacts = async () => {
      setIsLoading(true);
      setError(null);

      // First try to load from localStorage
      try {
        const savedContacts = loadFromLocalStorage();
        if (savedContacts.length > 0) {
          setContacts(savedContacts);
          return; // Skip API call if we have local data
        }
      } catch (err) {
        console.warn('Could not load from localStorage:', err);
        // Continue to API call even if localStorage fails
      }

      // If no local data, fetch from API
      try {
        const response = await fetch(import.meta.env.VITE_API_URL);
        if (!response.ok) {
          throw new Error('Error al cargar los contactos del servidor');
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        setError('Error al cargar los contactos: ' + err.message);
        console.error('Error fetching contacts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeContacts();
  }, []); // Run once on mount

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
      return;
    }
    console.log('Contact saved successfully:', newContact);
  };

  const handleSaveContacts = () => {
    const success = saveToLocalStorage(contacts);
    if (success) {
      alert('Contactos guardados exitosamente');
    } else {
      setError('Error al guardar los contactos');
    }
  };

  const handleLoadContacts = () => {
    try {
      const loadedContacts = loadFromLocalStorage();
      if (loadedContacts.length > 0) {
        setContacts(loadedContacts);
      } else {
        setError('No hay contactos guardados');
      }
    } catch (e) {
      setError('Error al cargar los contactos');
      console.error('Error loading contacts:', e);
    }
  };

  const handleSyncContacts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch from API
      const response = await fetch(import.meta.env.VITE_API_URL);
      if (!response.ok) {
        throw new Error('Error al cargar los contactos del servidor');
      }
      const apiContacts = await response.json();
      
      // Update state
      setContacts(apiContacts);
      
      // Save to localStorage
      const saveSuccess = saveToLocalStorage(apiContacts);
      if (!saveSuccess) {
        throw new Error('Error al guardar en almacenamiento local');
      }

      // Show success message
      alert('¡Sincronización exitosa!');
    } catch (err) {
      setError(`Error de sincronización: ${err.message}`);
      console.error('Sync error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <Navbar />
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}
      <main className="app-main">
        <div className="controls">
          <button 
            onClick={handleSyncContacts}
            className="sync-button"
            disabled={isLoading}
          >
            {isLoading ? '⭕ Sincronizando...' : '🔄 Sincronizar Datos'}
          </button>
          <button 
            onClick={handleLoadContacts}
            className="load-button"
            disabled={isLoading}
          >
            📂 Cargar Guardados
          </button>
          <button 
            onClick={handleSaveContacts}
            className="save-button"
            disabled={contacts.length === 0}
          >
            💾 Guardar Contactos
          </button>
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/contacts/all" replace />} />
          
          <Route path="/contacts" element={<ContactFilter />}>
            <Route 
              path=":type" 
              element={
                <FilteredContactsPage 
                  contacts={contacts}
                />
              } 
            />
          </Route>

          <Route 
            path="/new" 
            element={
              <NewContactPage 
                onAddContact={handleAddContact}
                isLoading={isLoading}
              />
            } 
          />
          
          <Route 
            path="/contact/:id" 
            element={<ContactDetailPage contacts={contacts} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;