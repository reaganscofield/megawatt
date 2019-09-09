import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Navigations from './Navigations';
import moment from 'moment';

export class SolarPanelsCrud extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      plant_name: '',
      plant_id: null,
      successMessage: null,
      errorObjects: {},
      errrorMessage: null,
      successMessageDataPoint: null,
    };
  }

  componentDidMount() {
    this.props.actions.pullDataAction();
    this.props.actions.pullPlantAction();
  }

  // controlling input fields
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlePlant = event => {
    this.setState({ plant_id: event.target.value });
  };

  // add plant method
  handleSavePlant = () => {
    if (this.state.plant_name === '') {
      this.setState({
        errorObjects: {
          border: 'solid 1px red',
        },
        errrorMessage: 'please enter your plant name',
      });
      setTimeout(() => {
        this.setState({
          errorObjects: {},
          errrorMessage: null,
        });
      }, 4000);
    } else {
      const data = { name: this.state.plant_name };
      this.props.actions.addPlantAction(data).then(response => {
        if (response.data) {
          this.setState({
            plant_id: response.data.id,
            successMessage: 'success added plant',
          });
          setTimeout(() => {
            this.setState({
              successMessage: null,
              errorObjects: {},
              errrorMessage: null,
            });
          }, 4000);
          window.location.reload();
        }
      });
    }
  };

  // delete plant method
  deletePlant = id => {
    this.props.actions.deletePlantAction(id).then(success => {
      if (success) {
        this.setState({
          successMessage: 'Success Deleted Plant',
        });
        setTimeout(() => {
          this.setState({
            successMessage: null,
          });
        }, 4000);
        window.location.reload();
      }
    });
  };

  // update datapoint method
  updateDataPoint = object => {
    object.plant_id = this.state.plant_id;
    this.props.actions.updateDataPointAction(object.id, object).then(response => {
      if (response.data) {
        this.setState({
          successMessageDataPoint: 'success updated',
        });
        setTimeout(() => {
          this.setState({
            successMessageDataPoint: null,
          });
        }, 4000);
      }
    });
  };

  render() {
    const data_pointData = this.props.home.pull_data_response;
    const plantData = this.props.home.plant_data_response;
    return (
      <div className="home-solar-panels-crud">
        <Navigations />
        <div className="container mt-5">
          <div>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <label>Plant Name</label>
                  <input
                    style={this.state.errorObjects}
                    type="text"
                    value={this.state.plant_name}
                    name="plant_name"
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  <small className="form-text text-danger">{this.state.errrorMessage}</small>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="form-group">
                  <label>Add Plant</label>
                  <button onClick={this.handleSavePlant} className="btn btn-info form-control">
                    add
                  </button>
                </div>
              </div>
              <div className="col-lg-6" />
            </div>
            <div className="row">
              <div className="col-lg-6">
                {this.state.successMessage !== null ? (
                  <div className="alert text-center alert-success" role="alert">
                    {this.state.successMessage}
                  </div>
                ) : null}

                <div className="mt-3">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Plant Name</th>
                        <th scope="col">Delete Plant</th>
                      </tr>
                    </thead>

                    {plantData ? (
                      <tbody>
                        {plantData.map((element, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{element.name}</td>
                            <td>
                              <button
                                onClick={() => this.deletePlant(element.id)}
                                className="btn btn-sm btn-danger"
                              >
                                delete
                              </button>{' '}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : null}
                  </table>
                </div>
              </div>
              <div className="col-lg-6" />
            </div>
          </div>
          {this.state.successMessageDataPoint !== null ? (
            <div className="alert text-center alert-success mt-3" role="alert">
              {this.state.successMessageDataPoint}
            </div>
          ) : null}
          <div className="card mt-5">
            <div className="card-body">
              <div className="chart-wrapper">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Observed/Ernegy</th>
                      <th scope="col">Expected/Irradiation</th>
                      <th scope="col">Select Plant</th>
                      <th scope="col">Update</th>
                    </tr>
                  </thead>

                  {data_pointData ? (
                    <tbody>
                      {data_pointData.map((element, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{moment(element.datetime).format('YYYY-MM-DD')}</td>
                          <td>{JSON.parse(element.observed).energy}</td>
                          <td>{JSON.parse(element.expected).irradiation}</td>
                          <td>
                            {plantData ? (
                              <select className="form-control" onChange={this.handlePlant}>
                                <option>Select Plant</option>
                                {plantData.map(plant => (
                                  <option key={plant.id} value={plant.id}>
                                    {plant.name}
                                  </option>
                                ))}
                              </select>
                            ) : null}
                          </td>
                          <td>
                            <button
                              onClick={() => this.updateDataPoint(element)}
                              className="btn btn-sm btn-info"
                            >
                              update
                            </button>{' '}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : null}
                </table>
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
)(SolarPanelsCrud);
