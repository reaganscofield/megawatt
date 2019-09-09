import React, { Component } from 'react';

export default class Navigations extends Component {
  static propTypes = {};

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
       <div className="container">
       <a className="navbar-brand text-light" href="/">
          Megawatt
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link text-light" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle text-light"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                User Interfaces
              </span>
              <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/solar-panel-crud">
                  Manager Solar Panel
                </a>
                <a className="dropdown-item" href="/dynamic-charts">
                  Dynamic Charts
                </a>
              </div>
            </li>
          </ul>
        </div>
       </div>
      </nav>
    );
  }
}
