import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Navigations from './Navigations';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';

export class DynamicCharts extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  // constructor
  constructor(props) {
    super(props);

    this.state = {
      date: [],
      expected_energy: [],
      expected_irradiation: [],
      observed_energy: [],
      observed_irradiation: [],
      showExpected: true,
      showObserved: false,
      currentGraph: 'Expected Data Report',
      // default date from today to last 7 days
      dateFrom: moment(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD'),
      dateTo: moment(new Date()).format('YYYY-MM-DD'),
    };
  }

  // life circle method
  componentDidMount() {
    const { dateFrom, dateTo } = this.state;
    this.queryDataPoint(dateFrom, dateTo);
  }

  // controlling input fields
  handleSelectedDate = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // controlling select box
  // to display Expected or Observed by Condition
  handleSelected = event => {
    if (event.target.value === 'Expected') {
     this.setState({ 
       showExpected: true, 
       showObserved: false,
       currentGraph: 'Expected Data Graph'
      });
    }
    if (event.target.value === 'Observed') {
      this.setState({ 
        showExpected: false, 
        showObserved: true,
        currentGraph: 'Observed Data Graph'
      });
    }
  };

  // filter button method to filter data by given date
  handleFilter = () => {
    const { dateFrom, dateTo } = this.state;
    this.queryDataPoint(dateFrom, dateTo);
  };

  // main method which query data point from backend
  queryDataPoint = (dateFrom, dateTo) => {
    // redux action function to query data
    this.props.actions.dynamicChartsAction(dateFrom, dateTo).then(response => {
      if (response.data) {
        const data = response.data;
        const date = [];
        const expected_energy = [];
        const expected_irradiation = [];
        const observed_energy = [];
        const observed_irradiation = [];
        const dataPoint = [];

        // create new array of objects with date format and json format
        data.forEach(element => {
          const newObject = {
            id: element.id,
            datetime: moment(element.datetime).format('YYYY-MM-DD'),
            expected: JSON.parse(element.expected),
            observed: JSON.parse(element.observed),
          };
          dataPoint.push(newObject);
        });

        // sorting data by date 
        const results = Object.values(
          dataPoint.reduce((reduceElement, elementObject) => {
            let weekNumber = moment(elementObject.datetime, 'DD-MM-YYYY').isoWeekday(),
              key = weekNumber + '_' + elementObject.datetime;
            reduceElement[key] = reduceElement[key] || [];
            reduceElement[key].push({ ...elementObject });
            return reduceElement;
          }, {}),
        );

        // preparing data from graph bar 
        results.forEach(result => {
          result.forEach(element => {
            if (date.indexOf(element.datetime) === -1) {
              date.push(element.datetime);
              if (element.expected) {
                expected_energy.push(element.expected.energy);
                expected_irradiation.push(element.expected.irradiation);
              }
              if (element.observed) {
                observed_energy.push(element.observed.energy);
                observed_irradiation.push(element.observed.irradiation);
              }
            }
          });
        });

        // updating states
        this.setState({
          date,
          expected_energy,
          expected_irradiation,
          observed_energy,
          observed_irradiation,
        });
      }
    });
  };

  render() {
    const {
      observed_energy,
      observed_irradiation,
      expected_energy,
      expected_irradiation,
    } = this.state;
    // graph bar 
    const dataExpectedGraph = {
      labels: this.state.date,
      datasets: [
        {
          label: 'Energy',
          backgroundColor: '#ff0000',
          borderWidth: 1,
          data: expected_energy,
        },
        {
          label: 'Irradiation',
          backgroundColor: '#000000',
          borderWidth: 1,
          data: expected_irradiation,
        },
      ],
    };
    const dataObservedGraph = {
      labels: this.state.date,
      datasets: [
        {
          label: 'Energy',
          backgroundColor: '#ff0000',
          borderWidth: 1,
          data: observed_energy,
        },
        {
          label: 'Irradiation',
          backgroundColor: '#000000',
          borderWidth: 1,
          data: observed_irradiation,
        },
      ],
    };
    return (
      <div className="home-dynamic-charts">
        <Navigations />
        <div className="container mt-5">
          <div>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <label>Date From</label>
                  <input
                    type="date"
                    value={this.state.dateFrom}
                    name="dateFrom"
                    onChange={this.handleSelectedDate}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>Date To</label>
                  <input
                    type="date"
                    value={this.state.dateTo}
                    name="dateTo"
                    onChange={this.handleSelectedDate}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-2">
                <div className="form-group">
                  <label>Filter</label>
                  <button onClick={this.handleFilter} className="btn btn-info form-control">
                    Filter
                  </button>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="form-group">
                  <label>Observed/Expected</label>
                  <select className="form-control" onChange={this.handleSelected}>
                    <option>Select</option>
                    <option>Expected</option>
                    <option>Observed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-center mt-5">{this.state.currentGraph}</h3>
          <div className="card mt-2">
            <div className="card-body">
              <div className="chart-wrapper">
                {this.state.showExpected === true ?
                   <Bar
                   data={dataExpectedGraph}
                   height={80}
                   options={{
                     responsive: true,
                     scales: {
                       xAxes: [
                         {
                           stacked: false,
                         },
                       ],
                       yAxes: [
                         {
                           stacked: false,
                         },
                       ],
                     },
                   }}
                 />
                 : null
                }
                {this.state.showObserved === true ?
                   <Bar
                   data={dataObservedGraph}
                   height={80}
                   options={{
                     responsive: true,
                     scales: {
                       xAxes: [
                         {
                           stacked: false,
                         },
                       ],
                       yAxes: [
                         {
                           stacked: false,
                         },
                       ],
                     },
                   }}
                 />
                 : null
                }
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
)(DynamicCharts);
