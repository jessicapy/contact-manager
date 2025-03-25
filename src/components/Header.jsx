import 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <h1>📘 Gestor de Contactos</h1>
      </div>
      <nav className="main-nav">
        <ul>
          <li><a href="/contactos">Contactos</a></li>
          <li><a href="/favoritos">Favoritos</a></li>
          <li><a href="/nuevo">Añadir Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;