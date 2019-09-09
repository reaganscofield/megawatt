import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Navigations from './Navigations';


export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <Navigations />
        <div className="home-default-page">
          <div className="container mt-5">
            <div className="jumbotron">
              <h1 className="display-4">
                Your fastest path to efficient wind and solar asset management
              </h1>
              <p className="lead">
                Discover the leading solar and wind software that helps manage 32 GW in 35 countries
              </p>
              <hr className="my-4" />
              <p>
                Whether you manage solar PV, wind, biomass, hydro or storage - our all-in-one
                software solution is built specifically for you. BluePoint has become the industry
                standard for professional renewable asset managers to save time, improve efficiency,
                share knowledge and reduce portfolio risk.
              </p>
              <div className="row pt-3">
                <div className="col-lg-6">
                  <a
                    className="btn btn-info btn-block text-light"
                    href="/solar-panel-crud"
                    role="button"
                  >
                   Manager Solar Panel
                  </a>
                </div>
                <div className="col-lg-6">
                  <a className="btn btn-info btn-block text-light" href="/dynamic-charts" role="button">
                    Dynamic Charts Repport
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultPage);
