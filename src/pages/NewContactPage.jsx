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

export default NewContactPage;