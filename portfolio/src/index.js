import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import rootReducer from './store/modules';
import { Provider } from 'react-redux';

import './index.css';
import Root from './Router';
import * as serviceWorker from './serviceWorker';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

ReactDOM.render(
<Provider store = {store}>
    <Root />
</Provider>
, document.getElementById('root'));
serviceWorker.unregister();
