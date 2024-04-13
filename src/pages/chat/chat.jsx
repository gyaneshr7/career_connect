import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const ChatPage = () => {
  return (
    <Provider store={store}>
         <App />
          </Provider>
  )
}

export default ChatPage