import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import {HelmetProvider} from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(<StrictMode>
    <HelmetProvider>
    <BrowserRouter>
        <Suspense>
            <App/>
        </Suspense>

    </BrowserRouter>
    </HelmetProvider>
</StrictMode>)
