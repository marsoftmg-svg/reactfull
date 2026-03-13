import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { markOrdersRead } from '../../store/dashboardSlice';

const NAV_ITEMS = [
  { to: '/',          label: 'Przeglad',    icon: '📊' },
  { to: '/products',  label: 'Produkty',    icon: '📦' },
  { to: '/analytics', label: 'Analityka',   icon: '📈' },
  { to: '/settings',  label: 'Ustawienia',  icon: '⚙️'  },
];

function Sidebar() {
  const newOrders = useSelector(s => s.dashboard.newOrders);
  const dispatch  = useDispatch();
 
  return (

    <aside className='sidebar'>
      <div className='sidebar-logo'>
        <span>ALX</span><span className='logo-accent'>Dash</span>
      </div>

      <nav>
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            // NavLink dostarcza isActive – uzywamy do CSS
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item--active' : ''}`
            }
          >
            <span className='nav-icon'>{icon}</span>
            <span>{label}</span>
            {/* Badge nowych zamowien – widoczny tylko na Przeglad */}
            {to === '/' && newOrders > 0 && (
                <span
                className='badge'
                onClick={e => { e.preventDefault(); dispatch(markOrdersRead()); }}
              >
                {newOrders}
              </span>
            )}
          </NavLink>
 ))}
      </nav>
    </aside>
  );
}

export default Sidebar;