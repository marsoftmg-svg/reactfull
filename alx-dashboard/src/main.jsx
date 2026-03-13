import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from "react-router-dom";
import {store} from "./store/store";
import {Provider} from "react-redux";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
<BrowserRouter basename='/projekt_js_1'>
    <App />
</BrowserRouter>

    </Provider>


  </StrictMode>,
)
