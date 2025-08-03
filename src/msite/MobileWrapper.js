

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import MobileRouter from './MobileRouter';
import './main.scss';

function MobileWrapper() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <MobileRouter />
      </div>
    </Provider>
  );
}

export default MobileWrapper;
