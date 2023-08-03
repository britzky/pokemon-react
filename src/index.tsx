import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element not found");
}
ReactDOM.render(
    <Router>
        <App />
    </Router>,
    rootElement
);

