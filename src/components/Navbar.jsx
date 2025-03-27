import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        end
      >
        📋 Lista de Contactos
      </NavLink>
      <NavLink 
        to="/new" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        ✏️ Nuevo Contacto
      </NavLink>
    </nav>
  );
};

export default Navbar;