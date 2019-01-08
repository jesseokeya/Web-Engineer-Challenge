import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      favorites: [],
      wastes: []
    }
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <nav className="navbar bg-custom text-center">
            <ul className="nav navbar-nav mx-auto">
              <li className="nav-item">
                <h2>
                  <b className="text-white"> Toronto Waste Lookup </b>
                </h2>
              </li>
            </ul>
          </nav>
          <br />
          <div className="container-fluid">
            <div className="text-center">
              <div className="col-11 inline">
                <input className="form-control form-control-lg" type="text" placeholder="Search" />
              </div>
              <button className="btn btn-primary btn-lg bg-search inline" aria-pressed="true">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
            <br />
            <br />
          </div>
          {/* if statement to check for favourites */}
          <div className="jumbotron">
            <div className="container-fluid jumbotron-up">
              <h3 className="text-head">Favourites</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
