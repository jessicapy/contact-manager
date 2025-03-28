import { useParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ContactList from '../components/ContactList';

const FilteredContactsPage = ({ contacts }) => {
  const { type } = useParams();
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter contacts by type and search term
  const filteredContacts = contacts
    .filter(contact => {
      // First filter by type
      if (type !== 'all' && contact.type !== type) return false;
      
      // Then filter by search term
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        contact.fullname.toLowerCase().includes(searchLower) ||
        contact.phonenumber.includes(searchTerm)
      );
    })
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      return modifier * (sortBy === 'name' 
        ? a.fullname.localeCompare(b.fullname)
        : a.type.localeCompare(b.type)
      );
    });

  return (
    <div className="filtered-contacts">
      <div className="search-controls">
        <input
          type="search"
          placeholder="Buscar por nombre o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="sort-controls">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Ordenar por Nombre</option>
          <option value="type">Ordenar por Tipo</option>
        </select>
        <button 
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="sort-direction"
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {filteredContacts.length === 0 ? (
        <p className="no-results">No se encontraron contactos</p>
      ) : (
        <ContactList contacts={filteredContacts} />
      )}
    </div>
  );
};

FilteredContactsPage.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullname: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      phonenumber: PropTypes.string.isRequired
    })
  ).isRequired
};

export default FilteredContactsPage;