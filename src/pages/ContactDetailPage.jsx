import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ContactDetailPage = ({ contacts, onDeleteContact, isLoading }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const contact = contacts.find(c => String(c.id) === id);

  const handleDelete = async () => {
    const success = await onDeleteContact(id);
    if (success) {
      navigate('/contacts/all');
    }
  };

  if (!contact) {
    return (
      <div className="contact-detail error">
        <p>Contacto no encontrado</p>
        <button onClick={() => navigate('/')} className="back-button">
          ← Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="contact-detail">
      <button onClick={() => navigate('/')} className="back-button">
        ← Volver
      </button>
      
      <div className="contact-info">
        <h2>{contact.fullname}</h2>
        <div className="detail-row">
          <span className="label">Teléfono:</span>
          <span className="value">{contact.phonenumber}</span>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">{contact.email}</span>
        </div>
        <div className="detail-row">
          <span className="label">Tipo:</span>
          <span className="value">{contact.type}</span>
        </div>
        
        <button 
          onClick={handleDelete}
          className="delete-button"
          disabled={isLoading}
        >
          {isLoading ? '⭕ Eliminando...' : '🗑️ Eliminar Contacto'}
        </button>
      </div>
    </div>
  );
};

ContactDetailPage.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullname: PropTypes.string.isRequired,
      phonenumber: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default ContactDetailPage;