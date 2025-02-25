import React from 'react';
import './ContactList.css';

function ContactList({ contacts }) {
  return (
    <div className="contact-list">
      <h2>Mis Contactos</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} className="contact-item">
            <div className="contact-info">
              <h3>{contact.name}</h3>
              <p>📱 {contact.phone}</p>
              <p>✉️ {contact.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;