import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "../store";
import Layout from './common/layout'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout {...this.props}/>
      </Provider>
    );
  }
}

export default App;
