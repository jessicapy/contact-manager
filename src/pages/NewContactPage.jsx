import PropTypes from 'prop-types';
import ContactForm from '../components/ContactForm';

const NewContactPage = ({ onAddContact, isLoading }) => {
  return (
    <div className="page">
      <h2>Nuevo Contacto</h2>
      <ContactForm 
        onAddContact={onAddContact}
        isLoading={isLoading}
      />
    </div>
  );
};

NewContactPage.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default NewContactPage;