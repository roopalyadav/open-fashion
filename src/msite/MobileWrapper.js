

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MobileRouter from './MobileRouter';
import './main.scss';

function MobileWrapper() {
  return (
    <Provider store={store}>
      <Header />
      <MobileRouter />
      <Footer />
    </Provider>
  );
}

export default MobileWrapper;
