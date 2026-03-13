import { useDarkMode } from "../hooks/useDarkMode";

function Settings() {
  const { darkMode, toggle } = useDarkMode(); 

  return (
    <div className='page'>
      <h1>Ustawienia</h1>
 
      <div className='settings-card'>
        <div className='setting-row'>
          <div>
            <h3>Tryb ciemny</h3>
            <p>Przelacz motyw aplikacji</p>
          </div>
          <button
            className={`toggle ${darkMode ? 'on' : 'off'}`}
            onClick={toggle}
            aria-label='Przelacz tryb ciemny'
          >
            <span className='toggle-knob' />
          </button>
        </div>
 
        <div className='setting-row'>
          <div>
            <h3>Stan Redux</h3>
            <p>Aktualny motyw zapisany w store</p>
          </div>
          <code className='code-badge'>
            darkMode: {String(darkMode)}
          </code>
        </div>
      </div>
    </div>
  );
}
 
export default Settings;