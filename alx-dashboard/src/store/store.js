import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import productsReducer from './productsSlice';

// Tworzymy store Redux, łącząc wszystkie slice'y (tu tylko dashboard)
// Każdy slice odpowiada za fragment stanu aplikacji i jego logikę
// W przyszłości można dodać kolejne slice'y np. dla produktów, użytkowników itp.
// Redux włącza DevTools w trybie development, co ułatwia debugowanie stanu aplikacji

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    products: productsReducer,
  },
});