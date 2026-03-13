import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../store/dashboardSlice';

export function useDarkMode()
{
const darkMode = useSelector(s => s.dashboard.darkMode);
const dispatch = useDispatch();

 // Synchronizuj klase CSS z body przy zmianie Redux state
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);
 
  const toggle = () => dispatch(toggleDarkMode());
 
  return { darkMode, toggle };
}