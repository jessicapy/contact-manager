import React from 'react';
import './ContactDetail.css';

function ContactDetail({ contact }) {
  return (
    <div className="contact-detail">
      <h2>Contacto Destacado</h2>
      <div className="detail-card">
        <div className="avatar">
          <span className="avatar-placeholder">
            {contact.name.charAt(0)}
          </span>
        </div>
        <div className="detail-info">
          <h3>{contact.name}</h3>
          <div className="info-item">
            <span className="icon">📱</span>
            <span>{contact.phone}</span>
          </div>
          <div className="info-item">
            <span className="icon">✉️</span>
            <span>{contact.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetail;