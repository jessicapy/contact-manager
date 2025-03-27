import { NavLink, Outlet } from 'react-router-dom';

const ContactFilter = () => {
  return (
    <div className="contact-filter">
      <nav className="filter-nav">
        <NavLink 
          to="/contacts/all"
          className={({ isActive }) => 
            isActive ? 'filter-link active' : 'filter-link'
          }
        >
          Todos
        </NavLink>
        <NavLink 
          to="/contacts/social"
          className={({ isActive }) => 
            isActive ? 'filter-link active' : 'filter-link'
          }
        >
          Social
        </NavLink>
        <NavLink 
          to="/contacts/familia"
          className={({ isActive }) => 
            isActive ? 'filter-link active' : 'filter-link'
          }
        >
          Familia
        </NavLink>
        <NavLink 
          to="/contacts/trabajo"
          className={({ isActive }) => 
            isActive ? 'filter-link active' : 'filter-link'
          }
        >
          Trabajo
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default ContactFilter;