import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { initFirebase } from './config/firebase';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

initFirebase();

ReactDOM.render(
  <App />
  , document.getElementById('root')
);

registerServiceWorker();
