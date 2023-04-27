import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <GoogleOAuthProvider clientId="466526983630-6vm2vl06fd5r103v23sub30tabe5865b.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);