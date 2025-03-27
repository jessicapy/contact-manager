import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ContactDetailPage = ({ contacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Convert id to string for comparison since useParams returns strings
  const contact = contacts.find(c => String(c.id) === id);

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
  ).isRequired
};

export default ContactDetailPage;